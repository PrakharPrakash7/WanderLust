const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    url: String,
    filename: String
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
     required: true
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ] ,
  owner:
  {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }

});


//Agar koi listing delete hoti hai to uske andar jo reviews hain unko bhi delete kardega
blogSchema.post('findOneAndDelete', async function (listing) {
  const Review = require('./review'); 
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews}});
  }
});

const Listing = mongoose.model('Listing', blogSchema);
module.exports = Listing;