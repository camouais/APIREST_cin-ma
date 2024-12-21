const Access_Film = require('../Data Access/Access_Movie.js');

exports.createFilm = async (film) => {
    const { Titre, Annee, Nom_Realisateur } = film;

    // Return the newly created film ID
    return await Access_Film.createFilm({ Titre, Annee, Nom_Realisateur });
};


exports.getFilmsByCity = async (city) => {
    return await Access_Film.getFilmsByCity(city);
};

exports.getFilms = async () => {
    return await Access_Film.getFilms();
};