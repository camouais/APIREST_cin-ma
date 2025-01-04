module.exports = (sequelize, Sequelize) => {
    const Salle = sequelize.define('Salle', {
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
        Climatise: {
            type: Sequelize.CHAR(1)
        },
        Capacite: {
            type: Sequelize.DECIMAL(4, 0)
        }
    }, {
        tableName: 'Salle',
        timestamps: false
    });

    return Salle;
}