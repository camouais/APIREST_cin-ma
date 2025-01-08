// Import jwt
const jwt = require('jsonwebtoken');
const jwtConfig = require('../Config/jwt.config');

// Verify token middleware
const verifyToken = (req, res, next) => {
    var token = req.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({
            success: false,
            message: 'Token manquant ou invalide'
        });
    }

    // Remove 'Bearer ' from the token
    token = token.slice(7, token.length);
    console.log('Received token:', token);

    // Vérify the token and decode it
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Token invalide'
            });
        }

        console.log('Decoded token:', decoded);
        req.decodedToken = decoded;
        next();
    });
};

module.exports = { verifyToken };