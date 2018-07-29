var express		    = require("express");
var router 			= express.Router({mergeParams: true});
var Campground  	= require("../models/Campground");
var middleware 		= require("../middleware");


router.get("/",function(req,res){
	Campground.find({}, function(err,campgrounds){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
})

router.post("/",middleware.isLoggedIn,function(req,res){
	var name = req.body.name; 
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = { name: name, image: image, description: description, author: author};
	Campground.create(newCampground, function(err,createdCampground){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(createdCampground);
			res.redirect("campgrounds");
		}
	})
})

router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/newCampground");
})

router.get("/:id",function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(campground);
			res.render("campgrounds/view",{campground: campground});
		}
	})
})

//EDIT
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	})
})

//update
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})

//delete
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err)
		{
			res.redirect("/campgrounds");
		}
		else
		{
			res.redirect("/campgrounds");
		}
	})
})

module.exports = router;
