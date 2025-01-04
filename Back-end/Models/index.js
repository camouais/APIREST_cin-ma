const dbConfig = require("../Config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Artiste = require('./artisteModel')(sequelize, Sequelize);
db.Cinema = require('./cinemaModel')(sequelize, Sequelize);
db.Film = require('./filmModel')(sequelize, Sequelize);
db.Role = require('./roleModel')(sequelize, Sequelize);
db.Salle = require('./salleModel')(sequelize, Sequelize);
db.Seance = require('./seanceModel')(sequelize, Sequelize);
db.Utilisateur = require('./utilisateurModel')(sequelize, Sequelize);

module.exports = db;