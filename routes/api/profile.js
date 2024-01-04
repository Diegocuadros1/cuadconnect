const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//----PROFILE GET----
//@route         | GET api/profile/me
// @description  | get your current users profile
// @access       | Private (needs a token to be able to access)
router.get('/me', auth, async(req, res) => {
  try {
    const profile = await Profile
      //find user id in database and match it with the profile user
      .findOne({ user: req.user.id  })
      //grab the name of the user and their avatar from User model
      .populate('user', ['name', 'avatar']);

    //if profile doesnt exist
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

//----PROFILE POST----
//@route         | POST api/profile/
// @description  | Create or update a user profile
// @access       | Private (needs a token to be able to access)

router.post('/', [
  //validation middleware
  auth, //make sure user is logged in
    [
      check('grade', 'Your grade is required') //grade must be filled out
        .not()
        .isEmpty(),
      check('school', 'Your school is required') //skills must be filled out
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    //if there are errors in the result: throw an error
    const errors = validationResult(req);
    if(!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() })
    }

    //pulling most stuff out of req.body (whatever is inputted on the site)(except experience and projects)
    const { grade, website, location, skills, school, bio, githubusername, youtube, twitter, facebook, linkedin, instagram, snapchat} = req.body;

    const profileFields = {}
    //setting the user of the profile to the user
    profileFields.user = req.user.id

    //if a certain input exists, then add it to the profileFields object
    if (grade) profileFields.grade = grade;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (school) profileFields.school = school;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim()) //turns string into an array .trim cuts off extra spaces
    }

    //build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (snapchat) profileFields.social.snapchat = snapchat;
    
    //inserting the data into the database
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      //if there is an alread existing user and they are adding more data into their profile
      if (profile) {
        //updating profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id }, //set the profile to that user
          { $set: profileFields }, //set the fields to the new profile fields
          { new: true }) //it is a new input

        return res.json(profile);
      }

      //Creating a new profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

//----VIEW ALL PROFILES GET----
// @route        | GET api/profile/
// @description  | get every profile
// @access       | public (doesnt need a token to be able to access)
router.get('/', async (req, res) => {
  try {
    //set profiles to every profile in the dataset
    const profiles = await Profile
      .find()
      .populate('user', ['name', 'avatar']); //add the user object with the user name and avatar to their profile
    res.json(profiles);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

//----VIEW ONE SPECIFIC PROFILE GET----
// @route        | GET api/profile/user/:user_id
// @description  | get only one certain profile
// @access       | public (doesnt need a token to be able to access)
router.get('/user/:user_id', async (req, res) => {
  try {
    //find a specific profile and go to their profile page
    const profile = await Profile
      .findOne({ user: req.params.user_id }) //find the user from the website url
      .populate('user', ['name', 'avatar']);

    //if profile being looked for doesnt exist
    if(!profile) {
      return res.status(400).json({msg: 'Profile not found'});
    }

    res.json(profile);

  } catch (err) {
    console.error(err.message);
    //If the user were to have a little extra or less characters in their ID
    if(err.kind == 'ObjectId') {
      return res.status(400).json({msg: 'Profile not found'});
    }
    res.status(500).send('Server Error')

  }
});

//----Delete profile and user----
// @route        | Delete api/profile/
// @description  | delete profile, user, and posts
// @access       | private (doesnt need a token to be able to access)
router.delete('/', auth, async (req, res) => {
  try {
    //TODO - Remove user posts as well

    //remove persons profile data from MongoDB
    await Profile.findOneAndDelete({ user: req.user.id });

    //removes persons user data from MongoDB
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: 'User deleted '});

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

//----Adding new experience to profile----
// @route        | PUT api/profile/experience
// @description  | Add profile experience
// @access       | private (doesnt need a token to be able to access)
router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'Date is required').not().isEmpty()
]], async(req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  //grabbing the data from the inputs
  const { title, company, location, from, to, current, description } = req.body;

  //adding that data into a new dictionary as new experiences
  const newExp = { title, company, location, from, to, current, description } //title: title same as title

  try {
    //finding profile from the user
    const profile = await Profile.findOne({ user: req.user.id });

    //adding the new experience onto the users profile
    profile.experience.unshift(newExp);

    //save the new profile
    await profile.save();

    //output it
    res.json(profile);
  //error handling
  } catch(err){
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

module.exports = router;
