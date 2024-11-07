const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with 'Bearer '
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const fullToken = req.headers.authorization.split(' ')[1]; // Get the token part after 'Bearer'
        
        // Split the token based on the '|' character
        const parts = fullToken.split('|');
        if (parts.length === 2) {
            // If format is correct, extract the token
            token = parts[1].trim(); // Extract the actual JWT token
        }
    }

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Attach the decoded payload to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error); // Log the error for debugging
        res.status(400).send('Invalid token.');
    }
};
