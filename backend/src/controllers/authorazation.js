const jwt = require('jsonwebtoken');
const crypto = require("crypto")

function verifyToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).redirect('/auth/login'); // Unauthorized, redirect to login
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).redirect('/auth/login'); // Unauthorized, redirect to login
        }

        req.user = decoded; // Attach decoded user information to the request
        return next(); // Corrected line: call next() without res.status(200)
    });
}

function IsverifyForLogin(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401),next() // Unauthorized, redirect to Login or Create Account
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).redirect('/auth/login'); // Unauthorized, redirect to Login or Create Account
        }

        req.user = decoded; 
        res.redirect('/'); // User is authorized, redirect to Dashboard
    });
}
module.exports = { verifyToken,IsverifyForLogin };
