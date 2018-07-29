var mongoose 	= require("mongoose");
var Campground  = require("./models/Campground");
var Comment 	= require("./models/Comment");

var data = [
	{
		name: "Tsomoriri Camp - Ladakh",
		image: "http://offbeatescapes.com/wp-content/uploads/2013/07/Tsomoriri-2.jpg",
		description: "Tsomoriri Resort & Camps is situated on Tsomoriri Lake (240 Kms from Leh) in the Changthang area at an altitude of 4,595 m (15,080 ft) in Ladakh and is one of the largest of the High Altitude Lakes in the region."
	},
	{
		name: "Desert Camp - Pushkar",
		image: "https://gos3.ibcdn.com/pushkar-adventure-desert-camp-pushkar-facade-32014297g.jpg",
		description: "The hippest way to rejoice in the real Rajasthani experience is through luxury camps and tents. A romantic culmination of dreams, a veritable recreation of a lifestyle which was once relished by the rulers of Rajputana in repose; the Desert Camp by Pushkar Palace offers an immensely delighting way to enjoy the tranquility and serenity of the desert exactly the way it was centuries ago."
	},
	{
		name: "Kipling Camp - MP",
		image: "https://media-cdn.tripadvisor.com/media/photo-s/01/77/f5/32/cottage-at-kipling-camp.jpg",
		description: "KIPLING CAMP is the perfect destination for those who wish to relax in idyllic surrounds and explore the remote forests and villages of central India. Established in 1982 by a family of conservationists on the edge of Kanha National Park, it is one of the finest wildlife camps in India with attention given to every detail. Over the years, the Camp has moved gently with the times, without spoiling its magical atmosphere."
	},
	{
		name: "Wese Ladakh Camp",
		image: "https://www.holidify.com/blog/wp-content/uploads/2016/08/west-ladakh-camp.jpg",
		description: "This is the best place that you'll ever visit"
	}
]


var seedDB =  function(){

	Campground.remove({},function(err){
	console.log("Successfully Removed all the Campgrounds");
		Comment.remove({},function(err){
			console.log("Removed the comments");
			/*data.forEach(function(seed){
				var comment = new Comment({
					author: "Ishank",
					text:   "Must visit this place"
				})

				comment.save(function(err){
					if(err)
					{
						console.log(err);
					}
				})

				var campground = new Campground({
					name: seed.name,
					image: seed.image,
					description: seed.description,
				})

				campground.comments.push(comment);

				campground.save(function(err){
					console.log(err);
				});
			})*/
		});
	});
};

module.exports = seedDB;