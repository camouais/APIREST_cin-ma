const db = require("../Models");

const Film = db.Film;

// Example routes for films
const getFilms = async (req, res) => {
    try {
        const films = await Film.findAll();
        res.status(200).json({ success: true, data: films });
    } catch (error) {
        console.error('Error fetching films:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur', error });
    }
};

const addFilm = async (req, res) => {
    console.log(req.body);
    const { Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum } = req.body;
    console.log("Received: Titre: " + Titre + " Annee: " + Annee + " Nom_Realisateur: " + Nom_Realisateur + " Duree: " + Duree + " Langue: " + Langue + " Sous_titres: " + Sous_titres + " Age_minimum: " + Age_minimum);
    try {
        const newFilm = await Film.create({ Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum });
        res.status(201).json({ success: true, message: 'Film créé avec succès', film: newFilm });
    } catch (error) {
        console.error('Error creating film:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur', error });
    }
};

module.exports = { getFilms, addFilm };