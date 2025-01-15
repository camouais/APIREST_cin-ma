const Access_Programmation = require("../Data Access/Acces_Programmation")

exports.createProgrammation = async (programmation) => {
    const { ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, ID_cinema } = programmation;
    return await Access_Projection.createProgrammation({ ID_film, Date_debut, Date_fin, Jours_semaine, Heure_debut, ID_cinema });
};

exports.getProgrammation = async () => {
    return await Access_Programmation.getProgrammation();
};

exports.getCinemaIdFromUser =  async (userId) => {
    return await Access_Programmation.getCinemaIdFromUser(userId);}


exports.getProgrammationByCinema = async (idcinema) => {
    return await Access_Programmation.getProgrammationByCinema(idcinema);
};