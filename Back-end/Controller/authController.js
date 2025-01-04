// /controllers/authController.js
const express = require('express');
const router = express.Router();
const authService = require('../Service/authService');

// Route pour l'authentification (connexion de l'utilisateur)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Received login request:', email); // Ajoutez ce log pour vérifier que la requête arrive bien

    try {
        const user = await authService.authenticateUser(email, password);
        res.status(200).json({
            success: true,
            message: 'Authentification réussie',
            user: {
                id: user.ID_utilisateur,
                nom: user.Nom,
                prenom: user.Prenom,
                role: user.Role
            }
        });
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
});


// Route pour l'inscription de l'utilisateur
router.post('/register', async (req, res) => {
    const { nom, prenom, email, password, role } = req.body;

    try {
        const userId = await authService.registerUser(nom, prenom, email, password, role);
        res.status(201).json({
            success: true,
            message: 'Utilisateur créé avec succès',
            userId
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
