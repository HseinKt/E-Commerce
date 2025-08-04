const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required:true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    // defining a relationship between the product model and category model
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    image: {
        type: String,
        required: true,
    }  
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;