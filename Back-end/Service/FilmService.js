const Access_Film = require('../Data Access/Access_Movie.js');

exports.getFilms = async () => {
    const films = await Access_Film.getFilms();
    console.log('Data returned from Access_Film:', films); // Log the data being returned
    return films;
};