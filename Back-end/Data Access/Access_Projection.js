const pool = require('../Database/config_database.js');

exports.createProjection = async (projection) => {
    const { Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film } = seance;
    const [result] = await pool.query(
        'INSERT INTO Seance (Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film) VALUES (?, ?, ?, ?, ?, ?)',
        [Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film]
    );
    return result.insertId;
};