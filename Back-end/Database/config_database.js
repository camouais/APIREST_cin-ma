const mysql = require('mysql2/promise'); // Use promise-based MySQL

const pool = mysql.createPool({
    host: 'localhost',      // Hostname of your database server
    user: 'root',           // Database username
    password: 'rootroot',   // Database password
    database: 'REST_API',   // Database name
    waitForConnections: true,
    connectionLimit: 10,    // Maximum number of connections in the pool
    queueLimit: 0           // No limit on queued requests
});

module.exports = pool;