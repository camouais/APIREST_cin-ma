const express = require('express');
const path = require('path');
const router = express.Router();
const FilmService = require("../Service/FilmService");


// Example routes for films
router.get('/films', async (req, res) => {
    try {
        res.json({ success: true, data: await FilmService.getFilms() });
    } catch (error) {
        console.error('Error fetching films:', error); // Log the error
        // Return error response as JSON
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.post('/filmcreate', async (req, res) => {
    const { Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum  } = req.body;  // Extract film data from the request body

    // Create the film using FilmService
    const newFilm = await FilmService.createFilm({ Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum  });

    // Send a success response
    res.status(201).json({
        success: true,
        message: 'Film created successfully',
        film: newFilm
    });
});

module.exports = router;
