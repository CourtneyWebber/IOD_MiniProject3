const sql = require("../db/db");
const fs = require('fs');
const path = require('path');
const { insertMovies } = require("../db/db_insert");

// constructor
module.exports = Movie = function (movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.original_title = movie.original_title;
    this.original_title_romanised = movie.original_title_romanised;
    this.image = movie.image;
    this.movie_banner = movie.movie_banner;
    this.description = movie.description;
    this.director = movie.director;
    this.producer = movie.producer;
    this.release_date = movie.release_date;
    this.running_time = movie.running_time;
    this.rt_score = movie.rt_score;
    this.url = movie.url;
    this.small_id = movie.small_id;
};

Movie.create = (newMovie, result) => {
    sql.query("INSERT INTO movie SET ?", newMovie, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        } else {
            console.log("Created and inserted movie: ", { id: res.insertID, ...newMovie });
            result(null, { id: res.insertID, ...newMovie });
        }
    });
}

Movie.createDb = () => {
    const createScript = fs.readFileSync(path.join(__dirname, '../db/create.sql'), { encoding: "UTF-8" });
    sql.query(createScript, function (error) {
        if (error) {
            console.log("Error creating database " + error);
        }
        else {
            console.log("Database and table(s) created");
        }
    });
    insertMovies(); //since sql.query is not synchronous, this function is often called before the db/tables have finished creating. 
    //should probably happen inside the callback after line 44 to prevent this
};

Movie.getAll = (result) => {
    sql.query("SELECT id, title, original_title, original_title_romanised, image, movie_banner, description, director, producer, release_date, running_time, rt_score, url, small_id FROM movie", (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }
        else if (res.length) {
            console.log("Got all movies");
            result(null, res);
            return;
        }
        else {
            result({ kind: "not_found" }, null);
        }
    });
};

Movie.getAllTitles = (result) => {
    sql.query("SELECT title FROM movie", (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }
        else if (res.length) {
            console.log("Got all movie titles");
            result(null, res);
            return;
        }
        else {
            result({ kind: "not_found" }, null);
        }
    });
};

Movie.getByTitle = (title, result) => {
    sql.query(`SELECT * FROM movie WHERE title = '${title}'`, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }
        else if (res.length) {
            console.log("Found movie with title: " + title, res);
            result(null, res);
            return;
        }
        else {
            result({ kind: "not_found" }, null);
        }
    });
};

Movie.getById = (small_id, result) => {
    sql.query(`SELECT * FROM movie WHERE small_id = ${small_id}`, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }
        else if (res.length) {
            console.log("Found movie with small_id: " + small_id, res);
            result(null, res);
            return;
        }
        else {
            result({ kind: "not_found" }, null);
        }
    });
};

Movie.getTitlesByScore = (rt_score, result) => {
    sql.query(`SELECT title FROM movie WHERE rt_score = ${rt_score}`, (error, res) => {
        {
            if (error) {
                console.log(error);
                result(error, null);
                return;
            }
            else if (res.length) {
                console.log("Found movie(s) with score: " + rt_score, res);
                result(null, res);
                return;
            }
            else {
                result({ kind: "not_found" }, null);
            }
        }
    });
};

Movie.updateById = (small_id, body, result) => {
    sql.query(`UPDATE movie SET ? WHERE small_id = '${small_id}'`, [body], (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }
        else if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("Updated movie: ", { small_id: small_id });
            result(null, { small_id: small_id });
        }
    });
};

Movie.deleteByName = (title, result) => {
    sql.query(`DELETE FROM movie WHERE title = '${title}'`, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }
        else if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("Deleted movie: ", { title: title });
            result(null, { title: title });
        }
    });
};

Movie.deleteById = (small_id, result) => {
    sql.query(`DELETE FROM movie WHERE small_id = '${small_id}'`, (error, res) => {
        if (error) {
            console.log(error);
            result(error, null);
            return;
        }
        else if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("Deleted movie: ", { small_id: small_id });
            result(null, { small_id: small_id });
        }
    });
};