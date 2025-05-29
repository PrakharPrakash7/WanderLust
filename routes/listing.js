const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const isLoggedin = require('../middlewares/isLoggedin');
const isOwner = require('../middlewares/isOwner');
//storing all backend in Controller folder
const listingController = require('../controllers/listing');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage});


// new  route

//passing the isLogged in as Middleware (req.isAuthemnticated())
router.get('/new', isLoggedin,listingController.new);

//logout route
router.get('/logout',listingController.logout);

// show route

router.get('/:id',listingController.show);


// create route
// using multer to upload image     // req.file me image ki details aayegi
router.post('/', isLoggedin,upload.single('image'),listingController.create);


// edit route

router.get('/:id/edit', isLoggedin,isOwner,listingController.edit);


// update route
router.put('/:id', isLoggedin,isOwner,upload.single('image'),listingController.update);


router.delete('/:id', isLoggedin,isOwner,listingController.delete);


module.exports = router;