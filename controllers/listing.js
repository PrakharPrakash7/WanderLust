const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync');

module.exports.show = 
     wrapAsync(async(req,res)=>{
        let id = req.params.id;
        //populate se reveiw me jo id hai wo object banjayega one to many relation
        const listing = await Listing.findById(id).populate('reviews').populate('owner');
        if(!listing) {
            req.flash('error', 'Listing not found');
            return res.redirect('/listing');
        }
        
        res.render('show.ejs',{listing});
    });


module.exports.new =(req,res)=>{
    res.render('new.ejs');
}

module.exports.logout = (req,res)=>{

    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully!');
        res.redirect('/listing');
    });
}

module.exports.create = wrapAsync(async (req,res)=>{
   
//    let result =  ListingSchema.validate(req.body);
  
//    if(result.error){
//       throw new ExpressError(400,result.error.details[0].message);
//    }
    let url =  req.file.path;
    console.log(url);
    let listing = new Listing({
        title: req.body.title,
        description: req.body.description,
        image: {
            url: req.file.path, //images
            filename: req.file.filename
        },
        price: req.body.price,
        location: req.body.location,
        country: req.body.country
    });
    console.log(listing.image);
    listing.owner = req.user._id; // Set the owner to the current user(session )
    await listing.save();

    req.flash('success', 'Listing created successfully!');
    res.redirect('/listing');
})

module.exports.edit =wrapAsync(async (req,res)=>{
    let id = req.params.id;
    const listing = await Listing.findById(id);
     if(!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listing');
    }
      req.flash('success', 'Listing Edited successfully!');
    res.render('edit.ejs',{listing});
})

module.exports.update = wrapAsync(async (req,res)=>{
    let id = req.params.id;
   let listing =  await Listing.findByIdAndUpdate(id,req.body);
   if(typeof req.file !== 'undefined' ) {
   listing.image = {
        url: req.file.path, //images
        filename: req.file.filename
   }
   await listing.save();
}
    
      req.flash('success', 'Listing Updated successfully!');
    res.redirect(`/listings/${id}`);
})

module.exports.delete =async (req,res)=>{
    let id = req.params.id;
    const listing = await Listing.findByIdAndDelete(id);
      req.flash('success', 'Listing Deleted successfully!');
    res.redirect('/listing');
}