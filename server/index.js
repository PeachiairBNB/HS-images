const express = require('express');
const axios = require('axios');
var dbfunctions = require('../db/dbfunctions.js')

// Middleware
const bodyParser = require('body-parser');

const app = express();
app.use('/:listingID', express.static(__dirname + '/../client/dist'));
console.log(__dirname + '/../client/dist');
app.use(bodyParser.json());


app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});


let port = 5000;
app.listen(port, function () {
    console.log(`listening on Port ${port}...`);
});

// Get images by Listing ID #
app.get('/api/pictures/:listingID', function (req, res) {
    let listingID = req.params.listingID;

    dbfunctions.findListingByID(listingID)
    .then((docs) => {
        res.send(docs);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

module.exports = app;