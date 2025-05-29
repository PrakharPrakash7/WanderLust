const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync');
const User = require('../models/user');

module.exports.renderSignup = (req, res) => {
    res.render('users/signup.ejs');
} 

module.exports.signup = wrapAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newuser = new User({ email, username });
        const registeredUser = await User.register(newuser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                req.flash('error', 'Login failed after registration');
                return res.redirect('/signup');
            }
            req.flash('success','Welcome to Wanderlust!');
            res.redirect('/listing');

        });
        
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
})


module.exports.renderLogin = (req, res) => {
    res.render('users/login.ejs');
};


module.exports.login = (req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back, ${username}!`);
    res.redirect('/listing');
}


