const express = require('express');
const path = require('path'); 
const filmController = require('../Back-end/Controller/FilmController.js');
const authController = require('../Back-end/Controller/authController.js');
const projectionController = require('../Back-end/Controller/ProjectionController.js');
const programmationController = require('../Back-end/Controller/programmationController.js')

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', filmController);
app.use('/api', projectionController);
app.use('/api', programmationController);
app.use(express.static(path.join(__dirname, '../Front-end/public')));
app.use('/auth', authController); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-end/public/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
