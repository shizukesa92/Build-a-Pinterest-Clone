const User = require('../models/user')
const jwt = require('jsonwebtoken')
module.exports = {

	signup: async (req, res, next) => {

		const user = await User.findOne({
			email: req.body.email
		})

		if (user) {
			res.send({
				error: 'user already exists'
			})
		}
		const newUser = new User()

		newUser.email = req.body.email
		newUser.name = req.body.name
		newUser.password = req.body.password

		await newUser.save()
		const token = jwt.sign({
			name: req.body.name,
			email: req.body.email,
			state: newUser.state,
			city: newUser.city
		}, 'secret', {
			expiresIn: '24h'
		})

		res.send(token)
	},

	login: async (req, res, next) => {
		const user = await User.findOne({
			email: req.body.email
		})
		if (!user) {
			res.send({
				email: 'user dont exist'
			})
		}
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (err) {
				res.send('err')
			}
			if (!isMatch) {
				res.send({
					password: 'wrong password'
				})
			}
			if (isMatch) {
				const token = jwt.sign({
					name: user.name,
					email: user.email,
					state: user.state,
					city: user.city
				}, 'secret', {
					expiresIn: '24h'
				})

				res.send(token)
			}
		})
	},

	authenticate: async (req, res, next) => {
		const authorizationHeader = req.headers['authorization']
		let token
		if (authorizationHeader) {
			token = authorizationHeader.split(' ')[1]


		}
		if (token) {

			const decoded = jwt.verify(token, 'secret')
			const user = await User.findOne({
				email: decoded.email
			})

			if (!user) {
				res.send('no such user')
			}
			req.user = user
			next()
		} else {}
	},


	info: async (req, res, next) => {

		const user = await User.findOne({
				_id: req.user._id
			})
			.populate('trade_requests.for')
			.populate('trade_requests.book')
			.populate('requests_for_you.from')
			.populate('requests_for_you.book')
		res.send(user)
	},
	deleteRequest: async (req, res, next) => {

		const user = await User.findOne({
			_id: req.user._id
		}).populate('trade_requests.for').populate('trade_requests.book')
		const userr = user.trade_requests.filter((request) => {

			return request._id.toString() !== req.body.id.toString()
		})
		user.trade_requests = userr
		await user.save()
		const trader = await User.findOne({
				_id: req.body.userid
			})
			.populate('trade_requests.for')
			.populate('trade_requests.book')
			.populate('requests_for_you.from')
			.populate('requests_for_you.book')
		const trade = trader.requests_for_you.filter((request) => {
			return request.reqid.toString() !== req.body.id.toString()
		})
		trader.requests_for_you = trade
		await trader.save()
		res.send(user)
	},



	users: async (req, res, next) => {
		const users = await User.find({})
		res.send(users)
	},
	delete: async (req, res, next) => {
		const deleted = await User.remove({})
		res.send(deleted)
	}

}
