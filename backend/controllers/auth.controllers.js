const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id:user._id, role:user.role},
        process.env.JWT_SECRET,
        { expireIn: '7d' }
    )
}

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
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

        const { password: _, ...newUser } = user.toJSON();

        res.status(201).json({ 
            message: 'User registered successfully',
            user: newUser
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });   
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).jason({
            message: 'Invalid Credentials'
        })

        const isMatch = await user.matchpassword(password);
        if(!isMatch) return res.status(404).jason({
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
        res.status(500).json({ message: 'Server error' });
    }
}