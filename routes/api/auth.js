const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

//---- GET REQUEST ----
// @route        | GET api/auth
// @description  | Test route || register user / add profile etc.
// @access       | Private (needs a token)

//NOTE: by adding the auth parameter, it makes the route protected
router.get('/', auth, async(req, res) => {
  try{
    //gets info of user
    const user = await User.findById(req.user.id).select('-password');

    //displays user data
    res.json(user);

  } catch(err) {
    console.error(err.message);
    res.status(500).send("Server Error")
  }
});

// ---- POST REQUEST | LOGGING IN ----
// @route        | POST api/auth
// @description  | Authenticate user and get token
// @access       | Public (to make sure we wont be restricted since we dont need a token)
router.post(
  '/', 
  [
    //Verifying whether inputs added are valid or not
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'password required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //if there are errors in the inputs
    if(!errors.isEmpty()) {
      //sets an error of 400 and displays the incorrect inputs
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //-----See if user exists -----
      //grabbing user email
      let user = await User.findOne({ email });

      if(!user) {
        //formulating the same user interface as the errors.array() above ^^
        return res.status(400).json({ errors: [ {msg: 'Invalid credentials'}] });
      }

      //---- make sure that the password matches ----
      //decrypting password
      const isMatch = await bcrypt.compare(password, user.password); //(password inputed | real encrypted password from database)

      //if the password doesn't match
      if(!isMatch) {
        return res.status(400).json({ errors: [ {msg: 'Invalid credentials'}] });
      }

      //NOTE: if function returns a promise you must use async await so you dont use .then

      //---- getting json web token ----
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
