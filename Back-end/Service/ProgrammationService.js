const Access_Projection = require('../Data Access/Acces_Programmation');

exports.createProgrammation = async (programmation) => {
    const { ID_projection, ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, Ville, ID_cinema } = programmation;
    return await Access_Projection.createProjection({ ID_projection, ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, Ville, ID_cinema });
};
exports.getProgrammationByCinema = async (cinema) => {
    return await Access_Projection.getProgrammationByCinema(cinema);
};
exports.getProgrammation = async () => {
    return await Access_Projection.getProgrammation();
};