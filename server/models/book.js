const mongoose = require('mongoose')
const User = require('./user')

const Schema = mongoose.Schema

const bookSchema = new Schema({
	id: {
		type: String
	},
	title: {
		type: String
	},
	authors: [],

	description: {
		type: String
	},
	image: {
		type: String
	},

	book_owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}

})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book
