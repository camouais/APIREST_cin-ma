const Access_Projection = require('../Data Access/Access_Projection');

exports.createProjection = async (projection) => {
    const { Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film } = projection;

    return await Access_Projection.createProjection({ Nom_cinema, No_salle, No_seance, Heure_debut, Heure_fin, ID_film });
};

exports.getProjectionByCinema = async (cinema) => {
    return await Access_Projection.getProjectionByCinema(cinema);
};

exports.getProjection = async () => {
    return await Access_Projection.getProjection();
};