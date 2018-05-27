var User = require('../../models/user');

module.exports = function(req,res) {
	
	//console.log('IN GET_USERNAME');
	
	User.findOne({_id:req.body.userID},function(err, user) {
			if(err)
				res.json({success:false, username: 'User Not Found', message: 'User not found.'})
			
			res.json({success:true, message: 'User found.', username: user.username}).end();
	});
}