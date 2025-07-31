const Category = require('../models/category.model');

exports.getAllCategories = async (req, res) => {
    console.log('Fetching all categories:');

    try {
        const categories = await Category.find();

        res.status(200).json({
            message: 'Categories fetched successfully',
            categories: categories
        })
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error FETCHING CATEGORIES' });    
    }
}

exports.getCategoryById = async (req, res) => {
    console.log('Fetching category by ID:');

    try {
        const { id } = req.params.id;
        const category = await Category.findById(id);

        if (!category) return res.status(404).json({
            message: 'Category not found'
        })

        res.status(200).json({
            message: 'Category fetched successfully',
            category: category
        })
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ message: 'Server error FETCHING CATEGORY BY ID' });
    }
}

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

        category.name = name || category.name;

        const updateCategory = await category.save();

        res.status(201).json({
            message: 'Category Updated successfully',
            Category: updateCategory
        })
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Server error UPDATING CATEGORY' });
    }
}

exports.deleteCategory = async (req, res) => {
    console.log('Deleting category:');

    try {
        const { id } = req.params.id;
        const category = await Category.findByIdAndDelete(id);

        if (!category) return res.status(404).json({
            message: 'Category not found'
        })

        res.status(200).json({
            message: 'Category deleted successfully',
            category: category
        })
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Server error DELETING CATEGORY' });
    }
}