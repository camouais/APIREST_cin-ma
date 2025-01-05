// /services/authService.js
const userDataAccess = require('../Data Access/userDataAccess');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../Config/jwt.config');

// Authentification de l'utilisateur
exports.authenticateUser = async (email, password) => {
    const user = await userDataAccess.getUserByEmail(email);
    
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }

    if (!await bcrypt.compare(password, user.Mot_de_passe)) {
        throw new Error('Mot de passe incorrect');
    }

    return user; 
};

exports.registerUser = async (nom, prenom, email, password, role) => {
    // Check if user already exists
    const existingUser = await userDataAccess.getUserByEmail(email);
    if (existingUser) {
        throw new Error('Cet utilisateur existe déjà');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await userDataAccess.createUser({
        nom, prenom, email, hashedPassword, role
    });

    return userId;
};

exports.generateToken = (user) => {
    const payload = {
        id: user.ID_utilisateur,
        email: user.Email,
        role: user.Role
    };

    return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
}
