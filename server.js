// server.js


var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

// log requests to the console
app.use(morgan('dev'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 9097; // set our port


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express_seed');

var Bear = require('./app/models/bear');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});




// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')
    // create a bear (accessed at POST http://localhost:8080/bears)
    .post(function(req, res) {

        var bear = new Bear(); // create a new instance of the Bear model
        bear.name = req.body.name; // set the bears name (comes from the request)

        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Bear created!'
            });
        });


    })
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')
    // get the bear with that id
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    // update the bear with this id
    .put(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'Bear updated!'
                });
            });

        });
    })
    // delete the bear with this id
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({
                message: 'Successfully deleted'
            });
        });
    });




// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);