const express = require('express');
//merge params ko hamesha true rakhna
const router = express.Router({mergeParams: true}); // This allows us to access params from the parent route});
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const Review = require('../models/review');
const isLoggedin = require('../middlewares/isLoggedin');
const reviewController = require('../controllers/reviews');

//post review
router.post('/',isLoggedin,reviewController.postReview);


//delete review route
router.delete('/:reviewId',isLoggedin,reviewController.deleteReview);


module.exports = router;