module.exports = (sequelize, Sequelize) => {
    const Artiste = sequelize.define('Artiste', {
        Nom: {
            type: Sequelize.STRING(20),
            allowNull: false,
            primaryKey: true
        },
        Prenom: {
            type: Sequelize.STRING(15)
        },
        Annee_naissance: {
            type: Sequelize.DECIMAL(4, 0)
        }
    }, {
        tableName: 'Artiste',
        timestamps: false
    });
    return Artiste;
}