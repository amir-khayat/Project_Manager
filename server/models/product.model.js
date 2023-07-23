const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        minlength: [2, "Price must be at least 1"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [2, "Name must be at least 2 characters long"]
    }

}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);