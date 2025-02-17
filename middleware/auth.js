const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        console.log("🔹 Received Token:", token);  
        console.log("🔹 JWT_SECRET used for verification:", process.env.JWT_SECRET); 

        const tokenWithoutBearer = token.replace('Bearer ', '').trim(); // Ensure no spaces
        console.log("🔹 Token After Removing 'Bearer':", tokenWithoutBearer);

        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);  
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = auth;
