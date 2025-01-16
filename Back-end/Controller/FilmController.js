const express = require('express');
const path = require('path');
const router = express.Router();
const FilmService = require("../Service/FilmService");
const { verifyToken } = require('../Middleware/authMiddleware');


// Example routes for films
router.get('/films', async (req, res) => {
    
    // console.log("je passe par /films");
    try {
        res.json({ success: true, data: await FilmService.getFilms() });
    } catch (error) {
        console.error('Error fetching films:', error); // Log the error
        // Return error response as JSON
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
router.get('/films/mine', verifyToken, async (req, res) => {
    const decodedToken = req.decodedToken;

    try {
        const films = await FilmService.getFilmsByOwner(decodedToken.id);
        console.log(films)
        res.json({ success: true, data: films });
    } catch (error) {
        console.error('Error fetching owner films:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.get('/filmsByArrondissement', async (req, res) => {
    const arrondissement = req.query.arrondissement;

    if (!arrondissement) {
        return res.status(400).json({
            success: false,
            message: 'Arrondissement is required'
        });
    }

    try {
        const films = await FilmService.getFilmsByArrondissement(arrondissement);
        res.status(200).json({ success: true, data: films });
    } catch (error) {
        console.error('Error fetching films by arrondissement:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.get('/acteurByFilm', async (req, res) => {
    const movie = req.query.movie;

    if (!movie) {
        return res.status(400).json({
            success: false,
            message: 'Film is required'
        });
    }

    try {
        const films = await FilmService.getActeurByFilm(movie);
        res.status(200).json({ success: true, data: films });
    } catch (error) {
        console.error('Error fetching acteur by film:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.post('/filmcreate', verifyToken, async (req, res) => {
    const decodedToken = req.decodedToken;

    if (decodedToken.role !== 'admin' && decodedToken.role !== 'proprietaire') {
        return res.status(403).json({
            success: false,
            message: 'Vous n\'avez pas les droits pour effectuer cette action'
        });
    }

    const { Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum } = req.body;

    try {
        const newFilm = await FilmService.createFilm(
            { Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum },
            decodedToken.id
        );

        res.status(201).json({
            success: true,
            message: 'Film created successfully',
            filmId: newFilm
        });
    } catch (error) {
        console.error('Error creating film:', error.message);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
});

router.delete('/films/mine/:id', verifyToken, async (req, res) => {
    const filmId = req.params.id; 
    console.log('ID du film à supprimer :', filmId);

    try {
        const result = await FilmService.deleteFilmById(filmId);
        console.log('Résultat reçu du service :', result);

        if (result.success) {
            res.json({ success: true, message: 'Film supprimé avec succès' });
        } else {
            res.status(404).json({ success: false, message: 'Film introuvable ou déjà supprimé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du film :', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
});
module.exports = router;
