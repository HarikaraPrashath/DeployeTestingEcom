const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const requireAuth = async (req, res, next) => {
    try {
        console.log('Request Headers:', req.headers); // Log all headers for debugging

        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            console.error('Authorization header missing or improperly formatted');
            return res.status(401).json({ error: 'Authorization token required' });
        }
 
        //token split method
        const token = authorization.split(' ')[1];
        if (!token) {
            console.error('Authorization token missing');
            return res.status(401).json({ error: 'Authorization token missing' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET || 'default_secret_key');
        console.log('Decoded Token:', decoded);

        // Validate user existence
        const user = await User.findById(decoded._id);
        if (!user) {
            console.error('User not found for ID:', decoded._id);
            return res.status(404).json({ error: 'User not found' });
        }

        // Attach user to request object
        req.user = user;

        // Proceed to the next middleware
        next();

        console.log('Authorization Header:', authorization);
        console.log('Extracted Token:', token);
        console.log('Decoded Token:', decoded);

    } catch (err) {
        console.error('JWT Error:', err.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = requireAuth;
