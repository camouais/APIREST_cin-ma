const express = require('express');
const path = require('path');
const router = express.Router();
const ProgrammationService = require('../Service/ProgrammationService.js');
const { verifyToken } = require('../Middleware/authMiddleware');

router.get('/programmations', async (req, res) => {
    console.log("je passe par /programmations");
    try {
        console.log("je passe par ICI prog");
        res.json({ success: true, data: await ProgrammationService.getProgrammation() });
    } catch (error) {
        console.error('Error fetching programmation:', error); // Log the error
        // Return error response as JSON
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.post('/programmationcreate', async (req, res) => {
    console.log('Received programmation creation request:', req.body); // Log the request body
    const { ID_projection, ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, Ville, ID_cinema  } = req.body;  // Extract film data from the request body
    // Create the film using FilmService
    const newProjection = await ProgrammationService.createProgrammation({ ID_projection, ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, Ville, ID_cinema });
    // Send a success response
    res.status(201).json({
        success: true,
        message: 'Programmation created successfully',
        seance: newProgrammation
    });
});


module.exports = router;