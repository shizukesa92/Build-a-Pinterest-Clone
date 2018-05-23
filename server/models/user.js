const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Book = require('./book')

const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		unique: true,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	city: {
		type: String,
		default: ''
	},
	state: {
		type: String,
		default: ''
	},
	books: [{
		type: Schema.Types.ObjectId,
		ref: 'Book'
	}],
	trade_requests: [{
		book: {
			type: Schema.Types.ObjectId,
			ref: 'Book'
		},
		for: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		accepted: {
			type: Boolean,
			default: false
		},
		pending: {
			type: Boolean,
			default: false
		}
	}],
	requests_for_you: [{
		book: {
			type: Schema.Types.ObjectId,
			ref: 'Book'
		},
		from: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		accept: {
			type: Boolean,
			default: false
		},
		reqid: Schema.Types.ObjectId
	}]
})

userSchema.pre('save', function(next) {
	const user = this
	if (!user.isModified('password')) return next()
	bcrypt.hash(user.password, 10, function(err, hash) {
		user.password = hash
		next()
	});
})

userSchema.methods.comparePassword = function(password, done) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		done(err, isMatch)
	})
}



module.exports = mongoose.model('User', userSchema)
