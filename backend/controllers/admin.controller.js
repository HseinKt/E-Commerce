const Product = require('../models/product.model');
const Category = require('../models/category.model');

exports.getStats = async (req, res) => {

    try {
        const totalProducts = await Product.countDocuments(); //SELECT COUNT(*) FROM products
        const totalCategories = await Category.countDocuments();
        const totalStock = await Product.aggregate([
            { $group: {_id: null, total: { $sum: '$quantity' } } }  //Run an aggregation query and group all documents, then sum the value of quantity across all products
        ])

        console.log("totalStock: ", totalStock[0].total );
        
        res.status(200).json({
            message: 'Stats fetched successfully',
            totalProducts: totalProducts,
            totalCategories: totalCategories,
            totalStock: totalStock[0]?.total || 0
        })
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Server error FETCHING STATS' });
    }
}