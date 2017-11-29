/*jshint esversion: 6 */
const mongoose = require('mongoose');

var Restaurant = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('Restaurant', Restaurant);
