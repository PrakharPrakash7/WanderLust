const mongoose = require('mongoose');
const insertData = require('./data');
const Listing = require('../models/listing');
require('dotenv').config();
const MongoUrl = process.env.MONGO_URL;
main()
.then(()=>{
    console.log('Connected to DB');
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(MongoUrl);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// const data = Listing.find({})
// console.log(data);
const initDB = async () => {
    
   insertData.data =  insertData.data.map((obj)=> ({...obj,owner:'683343ce26290b296a9be45d'}));
    await Listing.insertMany(insertData.data);
    console.log('Database Initialized');
}
initDB();
