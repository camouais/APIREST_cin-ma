module.exports = (sequelize, Sequelize) => {
    const Seance = sequelize.define('Seance', {
        Nom_cinema: {
            type: Sequelize.STRING(10),
            allowNull: false,
            primaryKey: true
        },
        No_salle: {
            type: Sequelize.DECIMAL(2, 0),
            allowNull: false,
            primaryKey: true
        },
        No_seance: {
            type: Sequelize.DECIMAL(2, 0),
            allowNull: false,
            primaryKey: true
        },
        Heure_debut: {
            type: Sequelize.DECIMAL(4, 2)
        },
        Heure_fin: {
            type: Sequelize.DECIMAL(4, 2)
        },
        ID_film: {
            type: Sequelize.DECIMAL(10, 0),
            allowNull: false
        }
    }, {
        tableName: 'Seance',
        timestamps: false
    });

    return Seance;
}