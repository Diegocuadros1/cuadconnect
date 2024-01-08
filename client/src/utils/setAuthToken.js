//Setting auth token
//takes in token, if the token is there then it will add it to the headers
// if it isnt, it will remove it from the headers

import axios from 'axios';

const setAuthToken = token => {
  if(token) {
    //setting the token as a header
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    //removing token as a header
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export default setAuthToken;