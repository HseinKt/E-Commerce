const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id:user._id, role:user.role},
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )
}

exports.register = async (req, res) => {

    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ 
            message: 'User already exists' 
        });

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        // Optional: Set role if provided
        if (role) user.role = role;
        // Save the user to the database
        await user.save();

        const { password: _, ...newUser } = user.toJSON(); //convert Mongoose doc to plain object

        res.status(201).json({ 
            message: 'User registered successfully',
            user: newUser
        })
    } catch (error) {
        console.error('Error registering user:', error); 
        res.status(500).json({ message: 'Server error REGISTER USER' });  
    }
}

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(404).json({
            message: 'Invalid Credentials'
        })

        const isMatch = await user.matchPassword(password);
        if(!isMatch) return res.status(404).json({
            message: 'Invalid Credentials'
        })

        const token = generateToken(user);
        const { password: _, ...userData } = user.toJSON();

        res.status(200).json({
            message: 'Login successful',
            user: userData,
            token: token
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error LOGIN USER' });
    }
}

exports.getCurrentUser = async (req, res) => {

    try {
        const userId = req.user.id; // Assuming user ID is set in req.user by middleware
        const user = await User.findById(userId).select('-password'); // Exclude password from response
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({
            message: 'Current user fetched successfully',
            user: user
        });
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ message: 'Server error GET CURRENT USER' });    
    }
}