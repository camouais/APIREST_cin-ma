const express = require('express');
const path = require('path');
const router = express.Router();
const FilmService = require("../Service/FilmService");
const { verifyToken } = require('../Middleware/authMiddleware');


// // Example routes for films
// router.get('/films', async (req, res) => {
    
//     console.log("je passe par /films");
//     try {
//         res.json({ success: true, data: await FilmService.getFilms() });
//     } catch (error) {
//         console.error('Error fetching films:', error); // Log the error
//         // Return error response as JSON
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// });
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

// router.post('/filmcreate', verifyToken, async (req, res) => {
//     const decodedToken = req.decodedToken;
//     if (decodedToken.role !== 'admin' && decodedToken.role !== 'proprietaire') {
//         return res.status(403).json({
//             success: false,
//             message: 'Vous n\'avez pas les droits pour effectuer cette action'
//         });
//     }
//     console.log('Received film creation request:', req.body); // Log the request body

//     const { Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum  } = req.body;  // Extract film data from the request body

//     // Create the film using FilmService
//     const newFilm = await FilmService.createFilm({ Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum  });

//     // Send a success response
//     res.status(201).json({
//         success: true,
//         message: 'Film created successfully',
//         film: newFilm
//     });
// });

module.exports = router;
