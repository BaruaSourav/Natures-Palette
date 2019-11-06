const express = require('express');
path = require('path');
bodyParser = require('body-parser');
cors = require('cors');
mongoose = require('mongoose');
var multer  =   require('multer');

config = require('./DBConfiguration');

const submissionroute = require('./routes/submission.route');

//mongodb connection promise
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

//express app configuarition
const app = express();
app.use('/submission',submissionroute);
app.use(bodyParser.json());
app.use(cors());
let port = process.env.PORT || 4000;


//Routes
app.get('/', function (req, res) {
    res.send('Testing Routes.')
})

//starting up the server
const server = app.listen(port, function () {
    console.log('NPServer Listening on port ' + port);
});