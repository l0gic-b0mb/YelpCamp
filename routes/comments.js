var express 		= require("express");
var router  		= express.Router({mergeParams: true});
var Campground  	= require("../models/Campground");
var Comment 		= require("../models/Comment");
var middleware 		= require("../middleware");

// COMMENT ROUTES

router.get("/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("comments/newComment", {campground: foundCampground});
		}
	})
})

router.post("/",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err)
		{
			console.log(err);
		}
		else
		{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
				{
					console.log(err);
				}
				else
				{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					console.log(comment);
					campground.comments.push(comment);
					campground.markModified('comments');
					campground.save(function(err){
						if(err)
						{
							console.log(err);
						}
						else
						{
							res.redirect("/campgrounds/" + campground._id);
						}
					});
					
				}
			})
		}
	})
})

//edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	console.log(req.params.comment_id);
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err)
		{
			res.send("comment not found");
		}
		else
		{
			res.render("comments/editComment",{campground_id: req.params.id,comment: foundComment});
		}
	})
})


//update
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err)
		{
			console.log(err);
			res.redirect("/campgrounds/" + req.params.id);
		}
		else
		{
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

//delete
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})


module.exports = router;