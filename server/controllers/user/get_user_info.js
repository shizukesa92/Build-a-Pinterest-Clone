var User = require('../../models/user');

module.exports = function(req,res) {
	
	//console.log('IN GET_USER_INFO');
	//console.log(req.session);
	
	if(req.session.passport && req.session.passport.user) {
		User.findOne({_id:req.session.passport.user},function(err, user) {
			//console.log('INSIDE GET USER DB CALL', user);
			response = {
				logged_in: true,
				username: user.username,
				userID: user._id,
				pins: user.pins || 'none'
			};
			res.json(response).end();
		});
	}
	else
		res.json({'logged_in':false}).end();
}