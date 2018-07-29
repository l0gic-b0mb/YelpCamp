var Campground  	= require("../models/Campground");
var Comment 		= require("../models/Comment");

var middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err)
			{
				res.redirect("/campgrounds");
			}
			else
			{
				if(foundCampground.author.id.equals(req.user._id))
				{
					next();
				}
				else
				{
					//req.flash("error", "You are not authorized to do that");
					res.redirect("back");
				}
			}
		})
	}
	else
	{
		res.redirect("/login");
	}
}

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated())
	{
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(foundComment.author.id.equals(req.user._id)){
				next();
			}
			else
			{
				res.redirect("back");
			}
		})
	}
	else
	{
		res.redirect("/login");
	}
}


middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	//req.flash("error", "You need to be logged in")
	res.redirect("/login");
}

module.exports = middlewareObj;