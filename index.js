const express = require('express');
const app = express();
const films = require('./films.json');
const salles = require('./salles.json');
const projections = require('./projections.json');

app.use(express.json());

// Routes Films
app.get('/films', (req, res) => {
    res.status(200).json(films);
});

app.get('/films/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const film = films.find(film => film.id === id);
    res.status(200).json(film);
});

app.post('/films', (req, res) => {
    const newFilm = req.body;
    films.push(newFilm);
    res.status(201).json(newFilm);
});

app.put('/films/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let film = films.find(film => film.id === id);
    if (film) {
        film = { ...film, ...req.body };
        res.status(200).json(film);
    } else {
        res.status(404).send('Film not found');
    }
});

app.delete('/films/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = films.findIndex(film => film.id === id);
    if (index !== -1) {
        films.splice(index, 1);
        res.status(200).json(films);
    } else {
        res.status(404).send('Film not found');
    }
});

// Routes Projections
app.get('/projections', (req, res) => {
    res.status(200).json(projections);
});

app.get('/projections/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const projection = projections.find(proj => proj.id === id);
    res.status(200).json(projection);
});

app.post('/projections', (req, res) => {
    const newProjection = req.body;
    projections.push(newProjection);
    res.status(201).json(newProjection);
});

app.put('/projections/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let projection = projections.find(proj => proj.id === id);
    if (projection) {
        projection = { ...projection, ...req.body };
        res.status(200).json(projection);
    } else {
        res.status(404).send('Projection not found');
    }
});

app.delete('/projections/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = projections.findIndex(proj => proj.id === id);
    if (index !== -1) {
        projections.splice(index, 1);
        res.status(200).json(projections);
    } else {
        res.status(404).send('Projection not found');
    }
});

// Démarrer le serveur
app.listen(8080, () => {
    console.log("Serveur à l'écoute sur le port 8080");
});
