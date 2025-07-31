const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
    console.log('Creating category:');

    try {
        const { name } = req.body;

        const existingCategory = await Category.findOne({ name });
        if( existingCategory ) return res.status(400).json({
            message: 'Category already exists'
        })

        const newCategory = new Category ( {
            name
        } )
        await newCategory.save();

        res.status(200).json({
            message: 'Category created successfully',
            category: newCategory
        })
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Server error CREATING CATEGORY' });
    }
}

exports.updateCategory = async (req, res) => {
    console.log('Updating category:');

    try {
        const { name } = req.body;
        const { id } = req.params.id;

        const category = await Category.findById(id);
        if( !category ) return res.status(404).json({
            message: 'Category not found'
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
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Server error UPDATING CATEGORY' });
    }
}