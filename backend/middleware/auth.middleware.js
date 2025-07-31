const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

        if (!token) return res.status(401).json({
                message: 'Unauthenticated - No token provided'
            })

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
            req.user = decode; // Attach user info to request object { id, role }
            next();   
        } catch (error) {
            res.status(401).json({
                message: 'Unauthenticated - Invalid or expired token'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });   
    }
}