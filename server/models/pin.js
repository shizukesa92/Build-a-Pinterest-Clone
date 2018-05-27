const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;
const uri = process.env.MONGOLAB_URI;
var db = mongoose.createConnection(uri);

var PinSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	thumbnail: {
		type: String,
		required: true
	},
	added_by: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	num_likes: {
		type: Number,
		default: 0
	},
	liked_by: {
		type: [String],
		default: []
	},
	num_repins: {
		type: Number,
		default: 0
	},
	repinned_by: {
		type: [String],
		default: []
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

var Pin = db.model('Pins', PinSchema, 'pins');

module.exports = Pin;
