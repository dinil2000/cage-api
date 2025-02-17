const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    specifications: {
        size: { type: String },
        material: { type: String },
        capacity: { type: String }
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);