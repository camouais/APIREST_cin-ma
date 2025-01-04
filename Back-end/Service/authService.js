// /services/authService.js
const userDataAccess = require('../Data Access/userDataAccess');

// Authentification de l'utilisateur
exports.authenticateUser = async (email, password) => {
    const user = await userDataAccess.getUserByEmail(email);
    
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }
    if (password!=user.Mot_de_passe ) {
        throw new Error('Mot de passe incorrect');
    }

    return user; 
};

exports.registerUser = async (nom, prenom, email, password, role) => {
    const userId = await userDataAccess.createUser({
        nom, prenom, email, password, role
    });

    return userId;
};
