const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const User = require('../models/user');
const passport = require('passport');
const userController = require('../controllers/users');


router.get('/signup', userController.renderSignup);

router.post('/signup',userController.signup );

router.get('/login', userController.renderLogin);

router.post('/login',passport.authenticate('local',{failureRedirect: '/login',failureFlash:true}), 
userController.login 
);

module.exports = router;