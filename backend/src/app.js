// backend/src/app.js
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

// Import controllers
const mainController = require('./routes/routes');
const userController = require('../../db/user');


// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../frontend/src/views/'));

// Middleware for serving static files
app.use(express.static(path.join(__dirname, '../../frontend/src/public/')));

// Define routes
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', mainController);
app.use('/user', userController);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;