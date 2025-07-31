// Contains functions that handle the logic for each route.

const Product = require('../models/product.model');
const Category = require('../models/category.model');

exports.createProduct = async (req, res) => {
    console.log('Creating product:');

    try {
        const { name, description, price, quantity, category, image } = req.body;

        const existingCategory = await Category.findById(category);
        if (!existingCategory) return res.status(400).json({
            message: 'Category does not exist'
        })

        const newProduct = new Product({
            name,
            description,
            price,
            quantity,
            category,
            image
        })
        await newProduct.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        })
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error CREATING PRODUCT' });
    }
}
