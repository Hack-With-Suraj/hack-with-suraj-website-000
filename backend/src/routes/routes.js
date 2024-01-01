const express = require('express');
const router = express.Router();
const CreateUser = require('../models/signupModal')
const loginuser = require('../models/loginModal')
const authorize = require('../controllers/authorazation')
const contactModel = require('../models/contact');
router.get('/',authorize.verifyToken, (req, res) => {
    res.render('index');
}); // Home page

router.get('/courses',authorize.verifyToken, (req, res) => {
    res.render('courses')
}); // courses page

router.get('/Documentation',authorize.verifyToken, (req, res) => {
    res.render('Documentation')
}); // Documentation page

router.get('/blog',authorize.verifyToken, (req, res) => {
    res.render('blog')
}); // blog page

router.get('/contactUs',authorize.verifyToken, (req, res) => {
    const error = null
    res.render('contactUs', {error})
})

router.get('/blog1',authorize.verifyToken, (req, res) => {
    res.render('blog1')
})
router.get('/blog2',authorize.verifyToken, (req, res) => {
    res.render('blog2')
})
router.get('/auth/signup',authorize.IsverifyForLogin, (req, res) => {
    const exist = null
    res.render('signup', {exist})
})

router.get('/auth/login',authorize.IsverifyForLogin,(req, res) => {
    const invalid = null
    res.render('login', {invalid})
})

router.get('/Documentation/:id', (req, res) => {
    res.render('under');
});
router.get('*', (req, res) => {
    res.render('404');
});


router.post("/signup", CreateUser);
router.post("/login", loginuser);
router.post("/contact", contactModel);
module.exports = router;
