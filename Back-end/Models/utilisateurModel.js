module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define('Utilisateur', {
        ID_utilisateur: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nom: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        Prenom: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        Email: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        Mot_de_passe: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        Role: {
            type: Sequelize.ENUM('proprietaire', 'admin'),
            allowNull: false
        },
        ID_cinema: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Cinema',
                key: 'ID_Cinema'
            }
        }
    }, {
        tableName: 'Utilisateur',
        timestamps: false
    });

    return Utilisateur;
}
