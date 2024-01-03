const jwt = require('jsonwebtoken');
const config = require('config');

//middleware function
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  //checking if there is no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, autorization denied' });
  }

  // verify token
  try {
    //decode the token with the token and the jwtSecret 
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user; //setting request.user to the user that is in that decoded user
    next();
  } catch (err) {
    //if there is a 401, it means that there is an authentication error
    res.status(401).json({ msg: 'Token is not valid' });
  }
}