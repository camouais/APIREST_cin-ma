const express = require('express');
const router = express.Router();
const ProjectionService = require('../Service/ProjectionService.js');

router.post('/projections', async (req, res) => {
    try {
        const projectionId = await ProjectionService.createProjection(req.body);
        res.status(201).json({ id: projectionId });
    } catch (err) {
        console.error('Error creating projection:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;