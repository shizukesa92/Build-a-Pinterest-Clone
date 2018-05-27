var express = require('express');
var router = express.Router();

//*****************************************************************************
// controllers
var get_user_info = require('../controllers/user/get_user_info');
var get_username = require('../controllers/user/get_username');
var update_user_info = require('../controllers/user/update_user_info');

var get_all_pins = require('../controllers/pin/get_all_pins');
var create_pin = require('../controllers/pin/create_pin');
var delete_pin = require('../controllers/pin/delete_pin');
var like_pin = require('../controllers/pin/like_pin');
var repin_pin = require('../controllers/pin/repin_pin');

//*****************************************************************************
// get user info
router.get('/get_user_info', get_user_info);

//*****************************************************************************
// get username
router.post('/get_username', get_username);

//*****************************************************************************
// update user info
router.post('/update_user_info', update_user_info);

//*****************************************************************************
// get pins
router.get('/get_all_pins', get_all_pins);

//*****************************************************************************
// pin add
router.post('/create_pin', create_pin);

//*****************************************************************************
// pin delete
router.post('/delete_pin', delete_pin);

//*****************************************************************************
// pin like
router.post('/like_pin', like_pin);

//*****************************************************************************
// pin delete
router.post('/repin_pin', repin_pin);

//*****************************************************************************

module.exports = router;
