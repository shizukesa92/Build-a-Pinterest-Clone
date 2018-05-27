var User = require('../../models/user');

module.exports = function(req,res) {
	
	//console.log('IN UPDATE_USER_INFO');
	//console.log(req.session);
	
	if(req.session.passport && req.session.passport.user) {
		User.findOne({_id:req.session.passport.user}, function(err, user) {
			
			//console.log('INSIDE UPDATE USER DB CALL', user);

			user.username = req.body.username || user.username;

			user.save(function(err, user) {
				if(err)
					res.json({success:false,message:'DB error.'}).end();
				else
					res.json({success:true,message:'User information updated.'}).end();
			})
		});
	}
}