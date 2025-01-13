const pool = require('../Database/config_database.js');

exports.createProgrammation = async (programmation) => {
    const { ID_projection, ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, Ville, ID_cinema } = programmation;
    
    console.log("Programmation reçue :", programmation);  // Vérifiez que les valeurs sont bien reçues
    // Si tous les champs ne sont pas fournis, le film n'est pas créé
    if (!ID_projection || !ID_film || !Date_debut || !Date_fin || !Jours_semaine || !Heure_debut || !Ville || !ID_cinema)
    {
        return;
    }
    const [result] = await pool.query(
        'INSERT INTO Seance (ID_projection, ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, Ville, ID_cinema) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [ID_projection, ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, Ville, ID_cinema]
    );
    console.log("Résultat de l'insertion :", result);
    return result.insertId;
};
exports.getProgrammationByCinema = async (idcinema) => {
    const [rows] = await pool.query('SELECT * FROM Programmation WHERE ID_cinema = ?', [idcinema]);
    return rows;
};
exports.getProgrammation = async () => {
    console.log("je passe dans getProgrammation");
    const [rows] = await pool.query('SELECT * FROM Programmation;');
    return rows;
};