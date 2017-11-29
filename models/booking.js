/*jshint esversion: 6 */
const mongoose = require('mongoose');

var Booking = new mongoose.Schema({
    tableId: {
        type: String,
        required: true,
    },
    fromDatetime: {
        type: Date,
        required: true,
    },
    toDatetime: {
        type: Date,
        required: true,
    },
    bookingStatus: {
        type: String,
        default: "unreserved",
    }
});

// Booking.pre('save', function(next) {
//     var booking = this;
//     booking.fromDatetime = new Date(booking.fromDatetime).toISOString();
//     booking.toDatetime = new Date(booking.toDatetime).toISOString();
    
//     next();
// });



module.exports = mongoose.model('Booking', Booking);
