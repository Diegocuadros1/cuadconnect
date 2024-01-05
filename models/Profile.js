const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  //creating a reference to the user model
  user: {
    type: mongoose.Schema.Types.ObjectId, //connecting user ID
    ref: 'user'
  },
  //other profile areas
  grade: { //follows status
    type: String, 
    required: true
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  skills: {
    type: [String],
  },
  school: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  projects: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      link: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
    snapchat: {
      type: String
    },
    discord: {
      type: String
    },
    phone: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema)