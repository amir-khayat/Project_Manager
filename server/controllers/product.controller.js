// Import
const Product = require("../models/product.model");

// Create
module.exports.createProduct = (req, res) => {
    Product.create(req.body)
        .then(product => res.json(product))
        .catch(err => res.status(400).json(err));
}

// Read all
module.exports.findAllProducts = (req, res) => {
    Product.find({})
        .then(products => res.json(products))
        .catch(err => res.status(400).json(err));
}

// Read one
module.exports.findOneProduct = (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(product => res.json(product))
        .catch(err => res.status(400).json(err));
}

// Update
module.exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(product => res.json(product))
        .catch(err => res.status(400).json(err));
}

// Delete
module.exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(product => res.json(product))
        .catch(err => res.status(400).json(err));
}