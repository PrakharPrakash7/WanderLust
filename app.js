if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// For debugging purposes, to check if the environment variable is loaded correctly

const express = require('express');
let engine = require('ejs-mate');
var methodOverride = require('method-override')
const app =  express();
app.engine('ejs', engine);
const port = 8080;
const path = require('path');
// const { v4: uuidv4 } = require('uuid');
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const mongoose = require('mongoose');
app.set('viewengine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
const flash = require('connect-flash');
//sessions
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Store session in MongoDB
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    crypto:{
        secret: process.env.SECRET
    },  
    touchAfter: 24 * 3600, 
    } )
const sessionOptions = {
    store: store, //mongoDB store for sessions
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
        expires:Date.now() + 1000 * 60 * 60 * 24, // 1 day in milliseconds
        maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
        httpOnly: true, // Helps prevent XSS attacks
    }
};

//In one session
app.use(session(sessionOptions));
// Middleware to set flash messages 
app.use(flash());  


//Using Passport for authentication

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware to set flash messages in res.locals
//res.locals store data that can be accessed in views
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user; // Store the current user in res.locals(current session)
    next();
});     
app.listen(port,()=>{
    console.log('Server is Listening');
});
const Listing = require('./models/listing');
// const Review = require('./models/review');

const MongoUrl = process.env.MONGO_URL ;
main()
.then(()=>{
    console.log('Connected to DB');
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(MongoUrl);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//show all listing index route
const wrapAsync = require('./utils/wrapAsync');
// const ExpressError = require('./utils/ExpressError');
// const ListingSchema = require('./schema');
// const ReviewSchema = require('./schema');

//Routes require using router(folder)
const listingRouter = require('./routes/listing');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');

app.get('/listing',wrapAsync(async(req,res)=>{
    let allListing = await Listing.find({});
   
    res.render('index.ejs',{allListing});
}));


//using router of listing
app.use('/listings',listingRouter);
app.use('/listings/:id/reviews',reviewRouter);
app.use('/',userRouter);


app.use((err,req,res,next)=>{
    let {status=500,message='Something went Wrong'} = err;
    res.render('error.ejs',{status,message});
});