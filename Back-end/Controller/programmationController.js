const express = require('express');
const path = require('path');
const router = express.Router();
const ProgrammationService = require('../Service/ProgrammationService.js');
const { verifyToken } = require('../Middleware/authMiddleware');

router.get('/programmations', async (req, res) => {
   
    try {
        res.json({ success: true, data: await ProgrammationService.getProgrammation() });
    } catch (error) {
        console.error('Error fetching programmation:', error); s
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.get('/programmations/mine', verifyToken, async (req, res) => { 
    const decodedToken = req.decodedToken;
    
    console.log("je passe par /programmations");
    try {
        // Récupérer l'ID du cinéma associé à l'utilisateur
        const cinemaId = await ProgrammationService.getCinemaIdFromUser(decodedToken.id); 
        
        if (!cinemaId) {
            return res.status(404).json({ success: false, message: 'Cinéma non trouvé pour cet utilisateur' });
        }
        
        console.log(decodedToken.id);
        const idcinema = cinemaId[0]?.id_cinema;

        // Récupérer les programmations associées à ce cinéma
        const programmations = await ProgrammationService.getProgrammationByCinema(idcinema);
        // console.log(programmations)
        
        res.json({ success: true, data: programmations });
    } catch (error) {
        console.error('Error fetching owner programmations:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



router.post('/programmationcreate', async (req, res) => {
    // console.log('Received programmation creation request:', req.body);
    const { ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, ID_cinema } = req.body;

    try {
        const newProgrammationId = await ProgrammationService.createProgrammation({ ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, ID_cinema });
        res.status(201).json({
            success: true,
            message: 'Programmation created successfully',
            programmationId: newProgrammationId
        });
    } catch (error) {
        console.error('Error creating programmation:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



module.exports = router;