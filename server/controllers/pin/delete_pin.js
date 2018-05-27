var Pin = require('../../models/pin');

module.exports = function(req,res) {

	//console.log('IN DELETE PIN');
	//console.log(req.body.pinID);

	Pin.findOneAndRemove({_id:req.body.pinID}, function(err, pin) {
		if(err)
			res.json({success: false, message: 'Delete pin error.'}).end();
		else
			res.json({success: true, message: 'Pin removed.'}).end();
	})
	
}