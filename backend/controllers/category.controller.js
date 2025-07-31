const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
    console.log('Creating category:');

    try {
        const { name } = req.body;

        const categoryExists = await Category.findOne({ name });
        if( categoryExists ) return res.status(400).json({
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