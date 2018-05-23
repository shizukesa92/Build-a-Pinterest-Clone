const axios = require('axios')
const Book = require('../models/book')
const User = require('../models/user')
module.exports = {
	books: async (req, res, next) => {
		const books = await axios({
			method: 'get',
			url: 'https://www.googleapis.com/books/v1/volumes?q=' + req.body.book
		})

		res.send(books.data.items)
	},

	addBook: async (req, res, next) => {
		const user = await User.findOne({
			_id: req.user._id
		}).populate('books')
		const newBook = new Book()
		Object.assign(newBook, req.body)
		newBook.book_owner = req.user._id
		await newBook.save()
		user.books.push(newBook._id)
		await user.save()
		const userr = await User.findOne({
			_id: req.user._id
		}).populate('books')
		res.send(userr.books)

	},
	deleteBook: async (req, res, next) => {
		const book = await Book.remove({
			_id: req.body.id
		})
		const userr = await User.findOne({
			_id: req.user._id
		}).populate('books')
		res.send(userr.books)
	},
	tradeRequest: async (req, res, next) => {
		const trade = req.body

		const user = await User.findOne({
			_id: req.user.id
		}).populate('trade_requests.for').populate('trade_requests.book')
		const trader = await User.findOne({
			_id: req.body.for
		}).populate('requests_for_you.book').populate('requests_for_you.from')
		user.trade_requests.push(req.body)
		const requestsForYou = {
			reqid: user.trade_requests[user.trade_requests.length - 1]._id,
			book: req.body.book,
			from: req.user._id
		}
		trader.requests_for_you.push(requestsForYou)

		await trader.save()
		await user.save()

		const userr = await User.findOne({
				_id: req.user._id
			})
			.populate('trade_requests.for')
			.populate('trade_requests.book')
			.populate('requests_for_you.from')
			.populate('requests_for_you.book')
		res.send(userr)

	},
	mybooks: async (req, res, next) => {
		const user = await User.findOne({
			_id: req.user._id
		}).populate('books')
		res.send(user.books)
	},


	allBooks: async (req, res, next) => {
		const books = await Book.find({}).populate('book_owner')
		const book = books.filter((book) => {

			return book.book_owner._id.toString() !== req.user._id.toString()
		})
		res.send(book)
	},
	accept: async (req, res, next) => {
		const user = await User.findOne({
			_id: req.user._id
		})
		user.requests_for_you.map((request) => {
			if (req.body.id == request.id) {
				request.accept = true

			}
		})
		await user.save()
		console.log(req.body)
		const trader = await User.findOne({
			_id: req.body.userid
		})
		trader.trade_requests.map((request) => {
			if (request._id == req.body.reqid) {
				request.accepted = true
			}
		})
		await trader.save()

		const userr = await User.findOne({
				_id: req.user._id
			})
			.populate('trade_requests.for')
			.populate('trade_requests.book')
			.populate('requests_for_you.from')
			.populate('requests_for_you.book')
		res.send(userr)
	},



	//test
	deleteBooks: async (req, res, next) => {
		const books = await Book.remove({})
		res.send(books)
	}




}
