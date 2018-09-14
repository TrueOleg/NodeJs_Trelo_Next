const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require(__dirname + '/routes');
const app = express();


// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.set('etag', false);
app.disable('etag')

app.use('/', router)

app.use(function (err, req, res, next) {
    console.log('error', err.message);
    res.status(err.status || 500);
    res.send(err.message);
});



app.listen(3000, function () {
    console.log('server run');
});
