const express = require('express');
const router = express.Router();
//JWT
const jwt = require('jsonwebtoken');
//bringing secret web token from default json
const config = require('config');
//avatar
const gravatar = require('gravatar');
//password encryption
bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator')

//getting user schema from User.js
const User = require('../../models/User')

//@route         | POST api/users
// @description  | register user
// @access       | Public (to make sure we wont be restricted since we dont need a token)
router.post(
  '/', 
  [
    //Verifying whether inputs added are valid or not
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Plase enter a password with 6 or more characters').isLength({ min: 6 })
  ], 
  async (req, res) => {
    const errors = validationResult(req);

    //if there are errors in the inputs
    if(!errors.isEmpty()) {
      //sets an error of 400 and displays the incorrect inputs
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //-----See if user already exists -----
      //grabbing user email
      let user = await User.findOne({ email });

      if(user) {
        //formulating the same user interface as the errors.array() above ^^
        return res.status(400).json({ errors: [ {msg: 'User already exists '}] });
      }

      //-----Get user gravatar -----
      const avatar = gravatar.url(email, {
        //default size
        s: '200',
        //rating / no naked ppl
        r: 'pg',
        //default / when there is no image, the default is some generated image
        d: 'mm'
      });

      //resetting user
      user = new User({ name, email, avatar, password});

      //-----Encrypt password -----
      //create a salt to do hashing
      const salt = await bcrypt.genSalt(10);

      //creating password
      user.password = await bcrypt.hash(password, salt);

      await user.save()

      //NOTE: if function returns a promise you must use async await so you dont use .then

      //---- return json web token ----
      //https://jwt.io/
      //get the payload / userID | same as session["user_id"] in flask
      const payload = {
        user: {
          id: user.id
        }
      }


      jwt.sign(
        payload, //user ID
        config.get('jwtSecret'), //passing in the secret
        {expiresIn: 360000}, //passing in the time until expiration (automatically logs out)
        (err, token) => {
          if (err) throw err; //if there is an error
          res.json({ token }); //sending the token back to the client
        }
      );


      // NOTE: req.body grabs json from postman/web server and is able to turn it into an object
      //console.log(req.body);
      //res.send('User registered')

    } catch(err) {
      //If there is an error, it must mean that there is a server error
      console.error(err.message);
      res.status(500).send('Server error')
    }

    
});


module.exports = router;
