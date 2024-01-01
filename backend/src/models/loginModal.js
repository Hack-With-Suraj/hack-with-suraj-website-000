const jwt = require('jsonwebtoken');
const userModal = require('../../../db/user');
const bcrypt = require('bcrypt');

async function HandleUserLogin(req, res) {
  try {
    const { username, password } = req.body;

    // Validation Checks
    if (!username || !password) {
      const error = "Username and password are required";
      return res.render('login', { error });
    }

    const user = await userModal.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const invalid = "User not found or incorrect password";
      return res.render('login', { invalid });
    }

    // Create and set JWT token in a cookie
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '72h' });
    res.cookie('token', token);

    res.redirect('/');
  } catch (error) {
    console.error('Error in HandleUserLogin:', error);
    return res.status(500).render('login', { error: 'Internal Server Error' });
  }
}

module.exports = HandleUserLogin;
