const express = require('express');
const path = require('path');
const db = require('./Models');

const app = express();
const port = 3000;

app.use(express.json());

// Sync db
const bcrypt = require('bcryptjs');
const Utilisateur = db.Utilisateur;
db.sequelize.sync()
    .then(async () => {
        console.log("Sync db.");

        // Check if a proprietaire user already exists
        const proprietaireExists = await Utilisateur.findOne({ where: { Role: 'proprietaire' } });
        if (!proprietaireExists) {
            // Create a proprietaire user
            const hashedPassword = await bcrypt.hash('password123', 10); // Replace 'password123' with a secure password
            await Utilisateur.create({
                Nom: 'Prop',
                Prenom: 'Prop',
                Email: 'proprietaire@example.com',
                Mot_de_passe: hashedPassword,
                Role: 'proprietaire',
                ID_cinema: 1 // Replace with the actual cinema ID
            });
            console.log("Proprietaire user created.");
        }
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    }); 

// Import controllers and middleware
const { getFilms, addFilm } = require('./Controller/FilmController');
const { getProjections } = require('./Controller/ProjectionController');

const { register, login } = require('./Controller/authController');
// const { verifyToken } = require('./middleware/authMiddleware');

// Routes
app.get('/api/films', getFilms);
app.post('/api/filmcreate', addFilm);

app.get('/api/projections', getProjections);

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Serve static files from the Front-end/public directory
app.use(express.static(path.join(__dirname, '../Front-end/public')));

// For others routes, return to front-end path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-end/public/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});