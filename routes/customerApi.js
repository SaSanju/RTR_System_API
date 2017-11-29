var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant.js');
var config = require('../config/database');
var Table = require('../models/table');
var Review = require('../models/review');

const utils = require('./utils');




// Find Restaurant API
/**
 * @api {post} http://localhost:8000/api/find_restaurant Search Restaurants
 * @apiName Search restaurants
 * @apiGroup Customers 
 *
 * @apiParam {String} name Keyword to match with the restaurant [Restaurant name] or [location] or [cuisine]. 
 *
 * @apiSuccess {Object} restaurants Array of restaurant object that matches any of the keywoard.
 */
router.post('/find_restaurant', (req, res) => {
    var queryObj = req.body.name;
    Restaurant.find({ $or: [{ name: queryObj }, { location: queryObj }, { cuisine: queryObj }] },
        function (err, restaurants) {
            if (err) {
                return res.send(err);
            }
            res.json(restaurants);
        });
});


// Find Restaurant By Capacity
/**
 * @api {post} http://localhost:8000/api/find_restaurant_by_table_capacity Search for table by capacity for a given Restauant 
 * @apiName Search restaurants by table capacity
 * @apiGroup Customers 
 *
 * @apiParam {Integer} capacity Capacity of the table to be searched. 
 * @apiParam {String} restaurantId Id of the restaurant 
 *
 * @apiSuccess {Object} restaurantArr Array of restaurant object that matches the given table capacity.
 */
router.post('/find_restaurant_by_table_capacity', function (req, res) {
    var capacity = req.body.capacity;
    var restaurantId = req.body.restaurantId;
    utils.findTableByCapacityForGivenRestaurant(restaurantId, capacity, function (restaurantArr) {
        if (restaurantArr.length) {
            res.json(restaurantArr);
        } else {
            res.status(400).send("Requested capacity is not present");
        }
    });
});


// Cancel Booked Table API
/**
 * @api {post} http://localhost:8000/api/cancel_table Cancel a table
 * @apiName Cancel Table
 * @apiGroup Customers 
 *
 * @apiParam {String} bookingId Id of the table booking transaction.  
 *
 * @apiSuccess {Object} message Shows the successful cancelled message with the booking id. 
 */
router.post('/cancel_table', (req, res) => {
    var bookId = req.body.bookingId;
    Table.findByIdAndRemove(bookId, function (err, result) {
        if (err) {
            return res.send(err);
        }
        res.json({
            message: 'Table booking cancelled',
            data: bookId,
            success: true
        });
    });
});


// Book Table in Restaurant 
/**
 * @api {post} http://localhost:8000/api/book_restaurant Book a table in a restaurant with the given capacity and given time range
 * @apiName Book a table
 * @apiGroup Customers 
 *
 * @apiParam {Integer} availability Availability of the table to be searched. 
 * @apiParam {String} restaurantId Id of the restaurant 
 * @apiParam {String} fromDateTime From Time Range .
 * @apiParam {String} toDateTime To Time Range .
 *
 * @apiSuccess {Object} bookingStatus Object which has booking details. Such as Restaurant id, Table id, Booking id.
 */
router.post('/book_restaurant', function (req, res) {
    var bookingObj = req.body;
    utils.findTableByCapacityForGivenRestaurant(bookingObj.restaurantId, bookingObj.availability,
        function (tableArr) {
            if (tableArr.length == 0) {
                res.status(400).send("Requested capacity is not present");
            } else {
                var timeRange = {
                    fromDateTime: new Date(bookingObj.fromDateTime).toISOString(),
                    toDateTime: new Date(bookingObj.toDateTime).toISOString()
                }

                var freeTables = [];
                tableArr.forEach(function (table, index) {

                    utils.getBookingListOfTable(table._id, timeRange, function (err, bookings) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        console.log(bookings)
                        if (bookings.length == 0) {
                            freeTables.push(table);
                        }
                        if (index == tableArr.length - 1) {
                            if (freeTables.length) {
                                freeTables.sort(function (a, b) {
                                    return a.capacity - b.capacity;
                                });
                                // res.json(freeTables);
                                utils.tableBooking(freeTables[0]._id, bookingObj, function (err, bookingStatus) {
                                    if (err) {
                                        return res.send(err);
                                    }
                                    res.json({
                                        message: 'Table Booked Successfully',
                                        data: bookingStatus,
                                        success: true
                                    });
                                });
                            } else {
                                res.send("No Tables are available");
                            }
                        }
                    });
                });
            }
        });
});



// Post Review By Customers
/**
 * @api {post} http://localhost:8000/api/review_by_customer Write review on a Restaurant
 * @apiName Customer Review
 * @apiGroup Customers 
 *
 * @apiParam {String} restaurantId Id of the restaurant. 
 * @apiParam {String} customerEmail Email id of the customer (Proper email format).
 * @apiParam {String} customerName Name of the customer.
 * @apiParam {String} customerReview Review about the restaurant written by customer 
 *
 * @apiSuccess {Object} object Shows the successful message along with added review data.
 */
router.post('/review_by_customer', (req, res) => {
    var obj = req.body;
    if (obj.restaurantId && obj.customerEmail && obj.customerName && obj.customerReview) {
        var review = new Review(req.body);

        review.save(function (err) {
            if (err) {
                return res.send(err);
            }
            res.json({
                message: 'Successfully Post a Review',
                data: review,
                success: true
            });
        });
    } else {
        return res.status(400).send("Inputs are missing");
    }
});


module.exports = router;