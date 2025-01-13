const express = require('express');
const path = require('path');
const router = express.Router();
const ProjectionService = require('../Service/ProjectionService.js');
const { verifyToken } = require('../Middleware/authMiddleware');

/*router.post('/projections', async (req, res) => {
    try {
        const projectionId = await ProjectionService.createProjection(req.body);
        res.status(201).json({ id: projectionId });
    } catch (err) {
        console.error('Error creating projection:', err);
        res.status(500).json({ error: 'Database error' });
    }
});
*/

router.get('/seances', async (req, res) => {
    console.log("je passe par /seances");
    try {
        console.log("je passe par ICI");
        res.json({ success: true, data: await ProjectionService.getProjection() });
    } catch (error) {
        console.error('Error fetching projection:', error); // Log the error
        // Return error response as JSON
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.post('/seancecreate', async (req, res) => {
    console.log('Received seance creation request:', req.body); // Log the request body
    const { Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film  } = req.body;  // Extract film data from the request body
    // Create the film using FilmService
    const newProjection = await ProjectionService.createProjection({ Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film  });
    // Send a success response
    res.status(201).json({
        success: true,
        message: 'Projection created successfully',
        seance: newProjection
    });
});


module.exports = router;