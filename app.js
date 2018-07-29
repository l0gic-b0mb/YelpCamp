var express 		= require("express"),
    app 			= express(),
    bodyParser 		= require("body-parser"),
    mongoose    	= require("mongoose"),
    passport  		= require("passport"),
    LocalStratergy 	= require("passport-local"),
    methodOverride	= require("method-override"),
    Campground  	= require("./models/Campground"),
    Comment 		= require("./models/Comment"),
    User			= require("./models/User"),
    seedDB 			= require("./seeds");


var indexroutes 	 = require("./routes/index"),
	campgroundroutes = require("./routes/campgrounds"),
	commentroutes	 = require("./routes/comments");

mongoose.connect("mongodb://b0mb:#RidlufursI89#@ds157097.mlab.com:57097/yelpcamp_b0mb", { useMongoClient: true } );
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "This can be anything, is used to encode",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//will be called on every route
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
})


//use routes
app.use("/",indexroutes);
app.use("/campgrounds", campgroundroutes);
app.use("/campgrounds/:id/comments", commentroutes);

//LISTENING
app.listen(3000,function(){
	console.log("Now serving yelpCamp at port 3000");
})