const Movie = require("../models/movie_model");
const dbPost = require("../db/db_insert");

//Validate, create, and save post in the database
exports.create = (req, res) => {

    //Validate
    if (!req.body) {
        res.status(400).send({
            message: "Need content"
        })
    }

    //Create
    const newMovie = new Movie({
        id: req.body.id,
        title: req.body.title,
        original_title: req.body.original_title,
        original_title_romanised: req.body.original_title_romanised,
        image: req.body.image,
        movie_banner: req.body.movie_banner,
        description: req.body.description,
        director: req.body.director,
        producer: req.body.producer,
        release_date: req.body.release_date,
        running_time: req.body.running_time,
        rt_score: req.body.rt_score,
        url: req.body.url,
        small_id: req.body.small_id
    });

    //Save
    Movie.create(newMovie, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "An error occurred when creating the movie."
            });
        } else {
            res.send(data);
        }
    });
};

exports.createDb = () => {
    Movie.createDb();
}

exports.getAll = (req, res) => {
    Movie.getAll((error, data) => {
        if (data == null) {
            console.log("Database null");
            dbPost.insertMovies();
        }
        res.send(data);
    });
};

exports.getAllTitles = (req, res) => {
    Movie.getAllTitles((error, data) => {
        if (data == null) {
            console.log(error);
        }
        else res.send(data);
    });
}

exports.getByTitle = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Need content"
        })
    }
    Movie.getByTitle(req.params.title, (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({
                    message: `Cannot find movie with title ${req.params.title}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving movie with title " + req.params.title
                });
            }
        } else res.send(data);
    });
};

exports.getById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Need content"
        })
    }
    Movie.getById(req.params.small_id, (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({
                    message: `Cannot find movie with small_id ${req.params.small_id}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving movie with small_id " + req.params.small_id
                });
            }
        } else res.send(data);
    });
};

exports.getTitlesByScore = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Need content"
        })
    }
    Movie.getTitlesByScore(req.params.score, (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({
                    message: `Cannot find movie with score ${req.params.score}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving movie with score " + req.params.score
                });
            }
        } else res.send(data);
    });
};

exports.updateById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Need content"
        })
    }
    Movie.updateById(req.params.small_id, req.body, (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({
                    message: `Cannot find movie with title ${req.params.title}`
                });
            } else {
                res.status(500).send({
                    message: "Error updating movie with title " + req.params.title
                });
            }
        } else res.send(data);
    });
};

exports.deleteByName = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Need content"
        })
    }
    Movie.deleteByName(req.params.title, (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({
                    message: `Cannot find movie with title ${req.params.title}`
                });
            } else {
                res.status(500).send({
                    message: "Error deleting movie with title " + req.params.title
                });
            }
        } else res.send(data);
    });
};

exports.deleteById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Need content"
        })
    }
    Movie.deleteById(req.params.small_id, (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({
                    message: `Cannot find movie with small_id ${req.params.small_id}`
                });
            } else {
                res.status(500).send({
                    message: "Error deleting movie with small_id " + req.params.small_id
                });
            }
        } else res.send(data);
    });
};