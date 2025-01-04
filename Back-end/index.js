const express = require('express');
const path = require('path'); // Add this line to import the path module
const pool = require('./Database/config_database.js');
const filmController = require('../Back-end/Controller/FilmController.js');
const projectionController = require('../Back-end/Controller/ProjectionController.js');
const FilmService = require("../Back-end/Service/FilmService.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', filmController);
//appuse('/api', projectionController);

// Serve static files from the Front-end/public directory
app.use(express.static(path.join(__dirname, '../Front-end/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-end/public/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
