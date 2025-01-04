// /controllers/authController.js
const db = require("../Models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtConfig = require('../Config/jwt.config');

const Utilisateur = db.Utilisateur;

// Route pour l'authentification (connexion de l'utilisateur)
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const utilisateur = await Utilisateur.findOne({ where: { Email: email } });
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const isPasswordValid = await bcrypt.compare(password, utilisateur.Mot_de_passe);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ id: utilisateur.ID_utilisateur, role: utilisateur.Role }, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn,
        });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Route pour l'inscription de l'utilisateur
const register = async (req, res) => {
    const { Nom, Prenom, Email, Mot_de_passe, Role, ID_cinema } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);
        const newUtilisateur = await Utilisateur.create({
            Nom,
            Prenom,
            Email,
            Mot_de_passe: hashedPassword,
            Role,
            ID_cinema
        });
        res.status(201).json({ message: 'Utilisateur créé avec succès', utilisateur: newUtilisateur });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = {register, login};
