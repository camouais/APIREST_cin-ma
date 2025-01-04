module.exports = (sequelize, Sequelize) => {
    const Cinema = sequelize.define('Cinema', {
        ID_Cinema: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nom_cinema: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        Arrondissement: {
            type: Sequelize.DECIMAL(2, 0)
        },
        Adresse: {
            type: Sequelize.STRING(30)
        }
    }, {
        tableName: 'Cinema',
        timestamps: false
    });

    return Cinema;
}