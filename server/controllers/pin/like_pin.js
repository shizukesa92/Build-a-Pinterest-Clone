var Pin = require('../../models/pin');

module.exports = function(req,res) {

	//console.log('IN LIKE PIN');
	
	Pin.findOne({_id:req.body.pinID}, function(err, pin) {

		var likedIndex = pin.liked_by.indexOf(req.body.userID);
		var action = '';

		// if user hasn't liked this pin yet
		if(likedIndex == -1) {
			pin.liked_by.push(req.body.userID);
			pin.num_likes++;
			action = 'liked.';
		} else {
			pin.liked_by.splice(likedIndex, 1);
			pin.num_likes--;
			action = 'unliked.';
		}

		pin.save(function(err, pin) {
			if(err)
				res.json({success:false,message:'Pin like error.'});
			else
				res.json({success:true,message:('Pin ' + action),pin:pin});
		});

	});
}