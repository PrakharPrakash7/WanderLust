const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync');
const Review = require('../models/review');

module.exports.postReview = wrapAsync(async (req,res)=>{
    let id = req.params.id;
    const listing = await Listing.findById(id);
    const newReview = new Review({
        comment: req.body.comment,
        rating: req.body.rating,
        author: req.user._id 
    });
    
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    
    res.redirect(`/listings/${id}`);
})

module.exports.deleteReview = wrapAsync(async (req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});  // (pull)reviews array ke andar review id match hoga to usko delte kardega
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
})