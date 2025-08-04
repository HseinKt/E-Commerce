// Contains functions that handle the logic for each route.

const Product = require('../models/product.model');
const Category = require('../models/category.model');

exports.getAllProducts = async (req, res) => {
    
    try {
        const products = await Product.find().populate('category');
        
        res.status(200).json({
            message: 'Products fetched successfully',
            products: products
        })
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error FETCHING PRODUCTS' });
    }
}

exports.getProductById = async (req, res) => {

    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('category');

        if (!product) return res.status(404).json({
            message: 'Product not found'
        })

        res.status(200).json({
            message: 'Product fetched successfully',
            product: product
        })
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Server error FETCHING PRODUCT BY ID' });
    }
}

exports.createProduct = async (req, res) => {

    try {
        const { name, description, price, quantity, category, image } = req.body;

        const existingCategory = await Category.findById(category);
        if (!existingCategory) return res.status(400).json({
            message: 'Category does not exist'
        })

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) return res.status(400).json({
            message: 'Product already exist'
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

exports.updateProduct = async (req, res) => {

    try {
        const { name, description, price, quantity, category, image } = req.body;
        const { id } = req.params;

        const product = await Product.findById(id);
        if( !product ) return res.status(404).json({
            message: 'Product not found'
        })

        const existingCategory = await Category.findById(category);
        if (!existingCategory) return res.status(400).json({
            message: 'Category does not exist'
        })

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.category = category || product.category;
        product.image = image || product.image;

        const updateProduct = await product.save();

        res.status(201).json({
            message: 'Product Updated successfully',
            product: updateProduct
        })
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error UPDATING PRODUCT' });
    }
}

exports.deleteProduct = async (req, res) => {

    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) return res.status(404).json({
            message: 'Product not found'
        })

        res.status(200).json({
            message: 'Product deleted successfully',
        })
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error DELETING PRODUCT' });
    }
}