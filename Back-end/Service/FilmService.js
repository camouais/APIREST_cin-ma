const Access_Film = require('../Data Access/Access_Movie.js');
const UserService = require('../Service/UserService'); // Service pour récupérer l'utilisateur

exports.createFilm = async (film, userId) => {
    // Récupérer l'utilisateur pour obtenir son ID_utilisateur
    const user = await UserService.getUserById(userId);
    if (!user || !user.ID_utilisateur) {
        throw new Error("User not found or doesn't belong to a cinema.");
    }

    // Ajoutez l'ID_utilisateur au film
    const filmWithUser = { ...film, ID_utilisateur: user.ID_utilisateur };

    // Insérez le film avec l'ID de l'utilisateur
    return await Access_Film.createFilm(filmWithUser);
};



exports.getFilmsByArrondissement = async (arrondissement) => {
    return await Access_Film.getFilmsByArrondissement(arrondissement);
};

exports.getFilms = async () => {
    return await Access_Film.getFilms();
};

exports.getFilmsByOwner = async (userId) => {
    return await Access_Film.getFilmsByOwner(userId);
};

exports.getActeurByFilm = async (movie) => {
    return await Access_Film.getActeurByFilm(movie);
};

exports.deleteFilmById = async (filmId) => {
    try {
        const result = await Access_Film.deleteFilmById(filmId);
        console.log('Résultat reçu d\'Access_Film :', result);

        if (result) {
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.error('Erreur dans FilmService.deleteFilmById :', error);
        throw error;
    }
};