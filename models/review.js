/*jshint esversion: 6 */
const mongoose = require('mongoose');
const validators = require('./validators');

var Review = new mongoose.Schema({
    restaurantId: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
        validate: [validators.validateEmail, 'Please fill a valid email address'],
    },
    customerName: {
        type: String,
        required: true,
    },
    customerReview: {
        type: String,
        required: true,
    },
    posted: {
        type: String,
        required: true,
        default: new Date().toISOString() 
    }
});


module.exports = mongoose.model('Review', Review);
