
const Listing = require('../models/listing');
module.exports = async(req, res, next) => {
   //authorization check if used by hoppscotch
   let id = req.params.id;
    const listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)) {
        req.flash('error', 'You are not owner of listing');
        return res.redirect(`/listings/${id}`);
    }
    next();
};