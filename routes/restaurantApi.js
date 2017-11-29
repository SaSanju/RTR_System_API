var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant.js');
var config = require('../config/database');
var Table = require('../models/table');
var Review = require('../models/review');

const utils = require('./utils');



// Restaurant Insertion API
/**
 * @api {POST} http://localhost:8000/api/add_restaurant Adding new Restaurant
 * @apiName Add Restaurant
 * @apiGroup Restaurant
 *
 * @apiParam {String} name Name of the restaurant.
 * @apiParam {String} location Location of the restaurant
 * @apiParam {String} cuisine Cuisine that the restaurant does 
 *
 * @apiSuccess {Object} restaturantId Id of the restaurant.
 */
router.post('/add_restaurant', (req, res) => {
    var restaurant = new Restaurant(req.body);

    restaurant.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.json({
            message: 'Restaurant created',
            data: restaurant._id,
            success: true
        });
    });
});


// Get OnBoarding Restaurants API
/**
 * @api {get} http://localhost:8000/api/get_onboardrestaurants Showing new restaurants
 * @apiName Onboarding Restaurant
 * @apiGroup Restaurant
 *
 * @apiSuccess {Object[]} restaurant Array of restaurant objects
 */
router.get('/get_onboardrestaurants', function (req, res) {
    Restaurant.find(function (err, restaurants) {

        if (err) {
            return res.send(err);
        }

        if (restaurants.length) {
            res.json(restaurants); // return latest 2 entries in JSON format
        } else {
            res.json([]);
        }

    }).sort({ _id: -1 }).limit(2);
});


// Delete Restaurant API
/**
 * @api {delete} http://localhost:8000/api/delete_restaurant/:id Delete a Restaurant
 * @apiName Delete Restaurant
 * @apiGroup Restaurant 
 *
 * @apiParam {Integer} id ID of the Restaurant to be deleted
 *
 * @apiSuccess {String} message Shows a successful deleted message with restaurant ID
 */
router.delete('/delete_restaurant/:id', function (req, res) {
    var restaurantId = req.params.id;
    Restaurant.findOneAndRemove({
        _id: restaurantId
    }, function (err, restaurant) {
        if (err)
            return res.status(404).send("The restaurant requested for deletion doesn't exists");

        if (restaurant)
            res.status(200).send("Deleted restaurant name " + restaurant.name);

    });
});



// Insert Table Capacity API
/**
 * @api {post} http://localhost:8000/api/add_table Add table to a specific restaurant
 * @apiName Add Table
 * @apiGroup Restaurant 
 *
 * @apiParam {String} restaurantId ID of the restaurant.
 * @apiParam {Integer} capacity Set Capacity of a table.
 *
 * @apiSuccess {Object} tableid Id of the table created along with message.
 */
router.post('/add_table', (req, res) => {
    Restaurant.find({ _id: req.body.restaurantId }, { _id: 1 }, function (err, restaurantStatus) {
        if (!restaurantStatus) {
            return res.status(404).send("The restaurant requested for add table doesn't exists");
        } else {
            var table = new Table(req.body);

            table.save(function (err) {
                if (err) {
                    return res.send(err);
                }
                res.json({
                    message: 'Table inserted',
                    data: table._id,
                    success: true
                });
            });
        }
    }).limit(1);
});


// Delete Table API
/**
 * @api {delete} http://localhost:8000/api/delete_table/:id Delete a Table.
 * @apiName Delete Table
 * @apiGroup Restaurant 
 *
 * @apiParam {Integer} id ID of the table to be deleted.
 *
 * @apiSuccess {String} message Shows a successful deleted message with table Id
 */
router.delete('/delete_table/:id', function (req, res) {
    var tableId = req.params.id;
    Table.findOneAndRemove({
        _id: tableId
    }, function (err, table) {
        if (err)
            return res.status(404).send("The table requested for deletion doesn't exists");

        if (table)
            res.status(200).send("Tableid " + tableId + " Deleted successfully");

    });
});



// Table Update API
/**
 * @api {post} http://localhost:8000/api/update_table Modify Capacity of a specific table
 * @apiName Update Table
 * @apiGroup Restaurant 
 *
 * @apiParam {String} tableId ID of the table.
 * @apiParam {Integer} capacity Capacity of a table to be modified.
 *
 * @apiSuccess {Object} message Shows a successful updation of the table with table Id.
 */
router.post('/update_table', (req, res) => {
    var tableId = req.body.tableId;
    Table.findByIdAndUpdate(tableId, { $set: { capacity: req.body.capacity } }, function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.json({
            message: 'Table information modified',
            data: tableId, 
            success: true
        });
    });
});



// Find Booking List
/**
 * @api {post} http://localhost:8000/api/booking_list Get bookings for a table by time range
 * @apiName Get table by timeRange
 * @apiGroup Restaurant 
 *
 * @apiParam {String} tableId ID of the table.
 * @apiParam {String} fromDateTime Time Range .
 * @apiParam {String} toDateTime Time Range .
 *
 * @apiSuccess {Object[]} bookinList Array of restaurant object that has been booked for the given time range.
 */
router.post('/booking_list', function (req, res) {
    var tableId = req.body.tableId;
    var timeRange = {}
    timeRange.fromDateTime = new Date(req.body.fromDateTime).toISOString();
    timeRange.toDateTime = new Date(req.body.toDateTime).toISOString();
    utils.getBookingListOfTable(tableId, timeRange, function (err, bookings) {
        if (err) {
            return res.status(400).send("Internal server error");
        }
        if (bookings.length) {
            res.json(bookings);
        } else {
            res.status(400).send("No Bookings are there");
        }
    });
});


module.exports = router;