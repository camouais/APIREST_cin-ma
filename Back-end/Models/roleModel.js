module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('Role', {
        Nom_Role: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        ID_film: {
            type: Sequelize.DECIMAL(10, 0),
            allowNull: false,
            primaryKey: true
        },
        Nom_acteur: {
            type: Sequelize.STRING(20),
            allowNull: false,
            primaryKey: true
        }
    }, {
        tableName: 'Role',
        timestamps: false
    });

    return Role;
}