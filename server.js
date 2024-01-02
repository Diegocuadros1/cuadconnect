const express = require("express");
const connectDB = require('./config/db');

const app = express();

//connecting the database
connectDB();

// Init Middleware | gets the data in req.body in users.js
app.use(express.json({ extended: false }));

//starting main
app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// setting up the port and running server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

