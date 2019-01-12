var app = require ('../server/index.js');
const bodyParser = require('body-parser');
// var db = require('../db/index.js')
var dbfunctions = require('../db/dbfunctions.js')

app.get('/imagesByID', function (req, res) {
    console.log('What is reqbody? >>>>>>>>', req.body);
    dbfunctions.findListingByID({
        id: req.body.id
    }, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.send(docs);
        }
    })
});