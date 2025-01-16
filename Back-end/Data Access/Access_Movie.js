const pool = require('../Database/config_database.js');

exports.createFilm = async (film) => {
    const { Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum, ID_utilisateur } = film;

    if (!Titre || !Annee || !Nom_Realisateur || !Duree || !Langue || !Sous_titres || !Age_minimum || !ID_utilisateur) {
        return null;
    }

    const [result] = await pool.query(
        'INSERT INTO Film (Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum, ID_utilisateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum, ID_utilisateur]
    );

    return result.insertId;
};



exports.getFilmsByOwner = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM Film WHERE ID_utilisateur = ?', [userId]);
    return rows;
};

/*
exports.getFilmsByCity = async (city) => {
    const [rows] = await pool.query('SELECT * FROM Film WHERE city = ?', [city]);
    return rows;
};
*/

exports.getFilmsByArrondissement = async (arrondissement) => {
    const query = `
        SELECT f.*
        FROM Film f
        JOIN Programmation p ON f.ID_film = p.ID_film
        JOIN Cinema c ON p.ID_Cinema = c.ID_Cinema
        WHERE c.Arrondissement = ?;
    `;
    const [rows] = await pool.query(query, [arrondissement]);
    return rows;
};


exports.getFilms = async () => {
    const [rows] = await pool.query('SELECT * FROM Film;');
    return rows;
};

exports.getActeurByFilm = async (movie) => {
    const query = `
        SELECT a.Nom_Acteur, a.prenom, a.roles 
        FROM Film f 
        JOIN Acteur a ON f.ID_film = a.ID_Film
        WHERE f.Titre = ?;
    `;
    const [row] = await pool.query(query, [movie]);
};

