
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/database');
var morgan = require('morgan');
var app = express();


var restaurantApiRouter = require('./routes/restaurantApi');
var customerApiRouter = require('./routes/customerApi');

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', restaurantApiRouter);
app.use('/api', customerApiRouter);


mongoose.connect(config.remoteUrl /*config.localUrl*/,{ useMongoClient: true }, function(err) {
    if (err) {
        return err;
    } else {
        console.log('Successfully connected to ' + config.remoteUrl /*config.localUrl*/);
    }
});

// app.use(express.static('./static'));
// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/static/app/views/index.html');
// });

app.listen(config.port, function() {
    console.log('Listening on port ' + config.port);
});
