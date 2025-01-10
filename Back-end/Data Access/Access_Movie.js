const pool = require('../Database/config_database.js');

exports.createFilm = async (film) => {
    const { Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum } = film;

    console.log("Film reçu :", film);  // Vérifiez que les valeurs sont bien reçues

    // Si tous les champs ne sont pas fournis, le film n'est pas créé
    if (!Titre || !Annee || !Nom_Realisateur || !Duree || !Langue || !Sous_titres || !Age_minimum) {
        return;
    }

    // Insertion du film dans la base (ne pas inclure ID_film dans l'INSERT)
    const [result] = await pool.query(
        'INSERT INTO Film (Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum]
    );
    

    console.log("Résultat de l'insertion :", result);  // Vérifiez le résultat d'insertion

    // Validation du résultat
    return result.insertId;  // Retourne l'ID du film nouvellement inséré
};

exports.getFilmsByOwner = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM Film WHERE ID_utilisateur = ?', [userId]);
    return rows;
};


exports.getFilmsByCity = async (city) => {
    const [rows] = await pool.query('SELECT * FROM Film WHERE city = ?', [city]);
    return rows;
};

exports.getFilms = async () => {
    const [rows] = await pool.query('SELECT * FROM Film;');
    return rows;
};

