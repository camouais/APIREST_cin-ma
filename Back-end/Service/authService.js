// /services/authService.js
const userDataAccess = require('../Data Access/userDataAccess');

// Authentification de l'utilisateur
exports.authenticateUser = async (email, password) => {
    const user = await userDataAccess.getUserByEmail(email);
    
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }

    if (!password) {
        throw new Error('Mot de passe incorrect');
    }

    return user; // Retourne l'utilisateur authentifié
};

// Inscription de l'utilisateur
exports.registerUser = async (nom, prenom, email, password, role) => {
    // Hachage du mot de passe avant de l'enregistrer

    // Crée un nouvel utilisateur dans la base de données
    const userId = await userDataAccess.createUser({
        nom, prenom, email, password, role
    });

    return userId;
};
