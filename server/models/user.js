const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;
const uri = process.env.MONGOLAB_URI;
var db = mongoose.createConnection(uri);

var UserSchema = new Schema({
	googleID: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	pins: {
		type: [String],
		default: []
	},
	pins_liked: {
		type: [String],
		default: []
	},
	pins_repinned: {
		type: [String],
		default: []
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
});

UserSchema.statics.findOrCreate = function(params, done) {
	User.findOne({
			'googleID': params.googleID
		},
		function(err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				user = new User({
					googleID: params.googleID,
					username: params.username || 'new user'
				});
				user.save(function(err) {
					if (err)
						return done(err, user);
				});
			} else {
				//found user. Return
				return done(err, user);
			}
		});
};

var User = db.model('Users', UserSchema, 'users');

module.exports = User;
