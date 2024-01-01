const userModal = require('../../../db/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function HandleUserSignup(req, res) {
    try {
        const { username, email, phoneNo, password, fullName } = req.body;
        const requiredFields = ['username', 'email', 'phoneNo', 'password', 'fullName'];

        // Validation Checks
        const missingField = requiredFields.find(field => !req.body[field]);
        if (missingField) {
            const exist = 'All fields are required';
            return res.render('signup', { exist });
        }

        // Check if username, email, and phoneNo are already in use
        const existingUser = await userModal.findOne({ $or: [{ username }, { email }, { phoneNo }] });
        const exist = 'User already in use';
        if (existingUser) return res.status(400).render('signup', { exist });

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 12);
        await userModal.create({ username, fullName, email, phoneNo, password: hashedPassword });

        // Generate JWT token, set the token in a cookie, and redirect
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '60h' });
        res.cookie('token', token);
        return res.status(200).redirect('/');
    } catch (error) {
        console.error('Error in HandleUserSignup:', error);
        return res.status(500).render('signup', { error: 'Internal Server Error' });
    }
}

module.exports = HandleUserSignup;
