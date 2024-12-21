const pool = require('../Database/config_database.js');

exports.createFilm = async (film) => {
    const { Titre, Annee, Nom_Realisateur } = film;

    // Si tous les champs ne sont pas fournis, le film n'est pas créé
    if (!Titre || !Annee || !Nom_Realisateur) {
        return;
    }

    // Insertion du film dans la base
    const [result] = await pool.query(
        'INSERT INTO Film (Titre, Annee, Nom_Realisateur) VALUES (?, ?, ?)',
        [Titre, Annee, Nom_Realisateur]
    );
    //

    // Validation du résultat
    return result.insertId;
};

exports.getFilmsByCity = async (city) => {
    const [rows] = await pool.query('SELECT * FROM Film WHERE city = ?', [city]);
    return rows;
};

exports.getFilms = async () => {
    const [rows] = await pool.query('SELECT * FROM Film;');
    return rows;
};

