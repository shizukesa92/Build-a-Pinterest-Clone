const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.route('/signup')
	.post(userController.signup)
router.route('/login')
	.post(userController.login)

router.route('/info')
	.get(userController.authenticate, userController.info)
router.route('/deleterequest')
	.post(userController.authenticate, userController.deleteRequest)


router.route('/users')
	.get(userController.users)

router.route('/delete')
	.delete(userController.delete)
module.exports = router
