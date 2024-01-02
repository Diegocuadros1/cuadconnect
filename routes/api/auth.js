const express = require('express');
const router = express.Router();

//@route         | GET api/auth
// @description  | Test route || register user / add profile etc.
// @access       | Public (to make sure we wont be restricted since we dont need a token)
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;
