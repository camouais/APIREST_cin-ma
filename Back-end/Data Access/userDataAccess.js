// /data-access/userDataAccess.js
const pool = require('../Database/config_database');

exports.getUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM Utilisateur WHERE Email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
};

exports.getUserById = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM Utilisateur WHERE ID_utilisateur = ?', [userId]);
    return rows[0];
};


exports.createUser = async (user) => {
    const { nom, prenom, email, hashedPassword, role } = user;

    // Vérifiez que tous les champs nécessaires sont fournis
    if (!nom || !prenom || !email || !hashedPassword || !role) {
        throw new Error('Données utilisateur manquantes');
    }

    // Insertion de l'utilisateur dans la base de données
    const [result] = await pool.query(
        'INSERT INTO Utilisateur (Nom, Prenom, Email, Mot_de_passe, Role) VALUES (?, ?, ?, ?, ?)',
        [nom, prenom, email, hashedPassword, role]
    );

    return result.insertId; // Retourne l'ID de l'utilisateur nouvellement créé
};

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connexion réussie à la base de données');
        connection.release(); // Libère la connexion
    }
});
