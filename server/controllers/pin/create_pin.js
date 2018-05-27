var Pin = require('../../models/pin');

module.exports = function(req,res) {

	//console.log('IN CREATE PIN');

	var newPin = new Pin({
		title: req.body.title,
		thumbnail: req.body.thumbnail,
		added_by: req.body.userID,
		username: req.body.username
	});

	newPin.save(function(err, pin) {
		if(err)
			res.json({success: false, message: 'Create pin error.', error: err}).end();
		else
			res.json({success: true, message: 'Pin created.'}).end();
	});

}