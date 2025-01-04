const Access_Film = require('../Data Access/Access_Movie.js');

exports.createFilm = async (film) => {
    const { Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum } = film;

    // Return the newly created film ID
    return await Access_Film.createFilm({ Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum });
};


exports.getFilmsByCity = async (city) => {
    return await Access_Film.getFilmsByCity(city);
};

exports.getFilms = async () => {
    return await Access_Film.getFilms();
};