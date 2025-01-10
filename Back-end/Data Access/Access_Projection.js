const pool = require('../Database/config_database.js');

exports.createProjection = async (projection) => {
    const { Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film } = projection;

    if (!Nom_cinema || !No_salle || !No_seance || !Heure_debut || !Heure_fin || !ID_film)
    {
        throw new Error('Veuillez indiquer tous les champs');
    }

    if (typeof Nom_cinema !== 'string' || typeof No_salle !== 'number' || typeof No_seance !== 'number' ||
        typeof Heure_debut !== 'string' || typeof Heure_fin !== 'string' || typeof ID_film !== 'number')
    {
        throw new Error('Type de données saisies invalides');
    }

    const [result] = await pool.query(
        'INSERT INTO Seance (Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film) VALUES (?, ?, ?, ?, ?, ?)',
        [Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film]
    );
    return result.insertId;
};