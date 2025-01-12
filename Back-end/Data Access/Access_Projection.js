const pool = require('../Database/config_database.js');

/*exports.createProjection = async (projection) => {
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
};*/

exports.createProjection = async (projection) => {
    const { Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film } = projection;
    
    console.log("Projection reçu :", projection);  // Vérifiez que les valeurs sont bien reçues
    // Si tous les champs ne sont pas fournis, le film n'est pas créé
    if (!Nom_cinema || !No_salle || !No_seance || !Heure_debut || !Heure_fin || !ID_film)
    {
        return;
    }
    const [result] = await pool.query(
        'INSERT INTO Seance (Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film) VALUES (?, ?, ?, ?, ?, ?)',
        [Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film]
    );
    console.log("Résultat de l'insertion :", result);
    return result.insertId;
};
exports.getProjectionByCinema = async (cinema) => {
    const [rows] = await pool.query('SELECT * FROM Seance WHERE Nom_cinema = ?', [cinema]);
    return rows;
};
exports.getProjection = async () => {
    console.log("je passe dans getProjection");
    const [rows] = await pool.query('SELECT * FROM Seance;');
    return rows;
};