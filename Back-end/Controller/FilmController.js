const express = require('express');
const path = require('path');
const router = express.Router();
const FilmService = require('../Service/FilmService.js');

// Example routes for films
router.get('/films', async (req, res) => {
    try {
        const films = await FilmService.getFilms();
        console.log('Data sent in response:', films); // Debug log
        res.json({ success: true, data: films });
    } catch (error) {
        console.error('Error fetching films:', error); // Log the error
        // Return error response as JSON
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
