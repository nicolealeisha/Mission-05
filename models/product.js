const mongoose = require('mongoose');

// Product Schema
const productSchema = mongoose.Schema({
    title: {type: String},
    description: {type: String},
    start_price: {type: Number},
    reserve_price: {type: Number}
});

// define and export
module.exports = mongoose.model('Product', productSchema);