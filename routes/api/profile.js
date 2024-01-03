const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route         | GET api/profile/me
// @description  | get current users profile
// @access       | Private (needs a token to be able to access)
router.get('/me', auth, async(req, res) => {
  try {
    const profile = await Profile
      //find user id in database and match it with the profile user
      .findOne({ user: req.user.id  })
      //grab the name of the user and their avatar from User model
      .populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    //load profile
    res.json(profile);

  //in case there is errors
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
