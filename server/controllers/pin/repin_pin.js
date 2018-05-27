var Pin = require('../../models/pin');

module.exports = function(req,res) {

	//console.log('IN REPIN PIN');

	Pin.findOne({_id:req.body.pinID}, function(err, pin) {
		if(err) throw err;

		var repinnedIndex = pin.repinned_by.indexOf(req.body.userID);
		var action = '';

		// if user hasn't liked this pin yet
		if(repinnedIndex == -1) {
			pin.repinned_by.push(req.body.userID);
			pin.num_repins++;
			action = 'repinned.';
		} else {
			pin.repinned_by.splice(repinnedIndex, 1);
			pin.num_repins--;
			action = 'unpinned.';
		}

		pin.save(function(err, pin) {
			if(err)
				res.json({success:false,message:'Pin repin error.'});
			else
				res.json({success:true,message:('Pin ' + action),pin:pin});
		});

	});
}