/*jshint esversion: 6 */
var Restaurant = require('../models/restaurant');
var Table = require('../models/table');
var Booking = require('../models/booking');


function getOnBoardingRestaurantList(res) {
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
};

function tableBooking(freeTableId, bookingParams, cb) {
    var bookingObj = {};
    bookingObj.tableId = freeTableId;
    bookingObj.fromDatetime = bookingParams.fromDateTime;
    bookingObj.toDatetime = bookingParams.toDateTime;
    bookingObj.bookingStatus = "reserved";

    var booking = new Booking(bookingObj);

    booking.save(function (err) {
        if (err) {
            cb(err, null);
        }
        cb(null, booking);
    });
};

function getBookingListOfTable(tableId, timeRange, cb) {
    var fromDatetime = timeRange.fromDateTime;
    var toDatetime = timeRange.toDateTime;
    Booking.find({
        $and: [{ tableId: tableId },
        {
            $or: [
                {
                    $and: [
                        { fromDatetime: { $lte: fromDatetime } }, { toDatetime: { $gte: fromDatetime } }
                    ]
                },
                {
                    $and: [
                        { fromDatetime: { $lte: toDatetime } }, { toDatetime: { $gte: toDatetime } }
                    ]
                },
                {
                    $and: [
                        { fromDatetime: { $gte: fromDatetime } }, { toDatetime: { $lte: toDatetime } }
                    ]
                }
            ]
        },
        { bookingStatus: "reserved" }]
    }, function (err, bookingList) {
        if (err) {
            cb(err, []);
        } else {
            cb(null, bookingList);
        }
    })
}

function findTableByCapacityForGivenRestaurant(restaurantId, capacity, cb) {
    Table.find({ $and: [{ restaurantId: restaurantId }, { capacity: { $gte: capacity } }] },
        function (err, tableArr) {
            if (err) {
                cb(err);
            } else {
                cb(tableArr);
            }
        });
}


module.exports = {
    getOnBoardingRestaurantList,
    tableBooking,
    getBookingListOfTable,
    findTableByCapacityForGivenRestaurant
};