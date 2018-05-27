const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv").config({
	path: "./.env"
});
const axios = require('axios')

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const api_route = require('./server/routes/routes');
const User = require('./server/models/user');

app.use(logger('tiny'));

app.use(cookieParser());

app.use(require('express-session')({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}));

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: 'https://sheltered-badlands-23557.herokuapp.com/auth/google/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOrCreate({
			googleID: profile.id,
			username: profile.name.givenName
		}, function(err, user) {
			return done(err, user);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

app.get('/auth/google',
	passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/plus.login']
	})
);

app.get('/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/'
	}),
	function(req, res) {
		res.redirect('/');
	}
);

app.get('/logout', function(req, res) {
	req.logout();
	res.json({
		success: true,
		message: 'Logged out.'
	}).end();
});

app.use('/api', api_route);

app.use("/public", express.static("./dist/client"));
const path = require('path');
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/dist/client/index.html")); // Cannot use render for html unlike pug etc
});


app.listen(process.env.PORT || 3000);
