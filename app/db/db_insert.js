const sql = require("./db.js");
const axios = require("axios");

function insertMovies() {
    console.log("Attempting to fetch data from API and insert into db.");
    axios.get('https://ghibliapi.herokuapp.com/films')
        .then(response => {
            try {
                for (movie of response.data) {
                    const film = {
                        id: movie.id,
                        title: movie.title,
                        original_title: movie.original_title,
                        original_title_romanised: movie.original_title_romanised,
                        image: movie.image,
                        movie_banner: movie.movie_banner,
                        description: movie.description,
                        director: movie.director,
                        producer: movie.producer,
                        release_date: movie.release_date,
                        running_time: movie.running_time,
                        rt_score: movie.rt_score,
                        url: movie.url
                    };
                    sql.query("USE movie; INSERT INTO movie SET ?", film);
                }
            } catch (e) {
                console.log(e);
            }
            console.log("API data successfully retrieved and inserted into the database.");          
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = { insertMovies };