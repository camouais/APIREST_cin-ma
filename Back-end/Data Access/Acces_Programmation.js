const pool = require('../Database/config_database.js');

exports.createProgrammation = async (programmation) => {
    const { ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, ID_cinema } = programmation;

    if (!ID_film || !Date_debut || !Date_fin || !Jours_semaine || !Heure_debut || !ID_cinema) {
        throw new Error('All fields are required');
    }

    const [result] = await pool.query(
        'INSERT INTO Programmation (ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, ID_cinema) VALUES (?, ?, ?, ?, ?, ?)',
        [ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, ID_cinema]
    );
    return result.insertId;
};



exports.getProgrammation = async () => {
    console.log("je passe dans getProgrammation");
    const [rows] = await pool.query('SELECT * FROM programmation;');
    return rows;
};

exports.getCinemaIdFromUser = async (userId) => {
    console.log("dkhdkdh",userId);
    const [rows] = await pool.query('SELECT id_cinema FROM utilisateur WHERE id_utilisateur = ?', [userId]);
    return rows;  
};


exports.getProgrammationByCinema = async (idcinema) => {
    console.log("dkhdkdh",idcinema);
    const [rows] = await pool.query('SELECT * FROM programmation WHERE ID_cinema = ?', [idcinema]);
    return rows;
};
