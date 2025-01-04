module.exports = (sequelize, Sequelize) => {
    const Film = sequelize.define('Film', {
        ID_film: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Titre: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        Annee: {
            type: Sequelize.DECIMAL(4, 0)
        },
        Nom_Realisateur: {
            type: Sequelize.STRING(255)
        },
        Duree: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false
        },
        Langue: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        Sous_titres: {
            type: Sequelize.STRING(50)
        },
        Age_minimum: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Film',
        timestamps: false
    });

    return Film;
}