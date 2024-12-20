const pool = require('../Database/config_database.js');

exports.getFilms = async () => {
    const [rows] = await pool.query('SELECT * FROM Film;');
    return rows;
};

