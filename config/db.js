const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  //try to connect to the mongoDB server
  try {
    //look for a mongo DB connection in the json URI and connect to it
    await mongoose.connect(db);

    console.log('MongoDB Connected...');
  } catch(err) {
    console.error(err.message);
    
    process.exit(1);
  }
}

module.exports = connectDB;