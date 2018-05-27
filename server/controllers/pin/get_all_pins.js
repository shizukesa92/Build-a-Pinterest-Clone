var Pin = require('../../models/pin');

module.exports = function(req,res) {

	//console.log('IN GET ALL PINS');

	//this is fine for now, but at some point you'll want to add a limit on the number of pins returned
	//sorted by createdAt
	Pin.find().sort({createdAt:-1}).exec(function(err, pins) {
		if(err) {
			//console.log('get all pins error');
			//console.log(err);
			res.json({success:false,message:'Error retrieving pins.'}).end();
		}
		else {
			//console.log('get all pins success');
			res.json({success:true,message:'Pins retrieved successfully.',pins:pins}).end();
		}
	});
}