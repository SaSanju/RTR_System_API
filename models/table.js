/*jshint esversion: 6 */
const mongoose = require('mongoose');

var Table = new mongoose.Schema({
    restaurantId: {
        type: String,
        required: true,
    },
    capacity: Number
});


module.exports = mongoose.model('Table', Table);
