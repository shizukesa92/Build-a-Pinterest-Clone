const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config({
	path: "./.env"
});
const axios = require('axios')

const app = express();

const uri = process.env.MONGOLAB_URI;
mongoose.connect(uri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

const booksRoutes = require('./server/routes/book.routes')
const userRoutes = require('./server/routes/user.routes')
app.use(booksRoutes, userRoutes)


app.use(express.static("./dist/client"));
const path = require('path');
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/dist/client/index.html")); // Cannot use render for html unlike pug etc
});




app.listen(process.env.PORT || 3000);
