module.exports = app => {
    const movieController = require("../controllers/movie_controller");
    const router = require("express").Router();

    router.post("/", movieController.create);
    router.get("/", movieController.getAll);
    router.get("/titles", movieController.getAllTitles);
    router.get("/id/:small_id", movieController.getById);
    router.get("/titles/:title", movieController.getByTitle);
    router.get("/score/:score", movieController.getTitlesByScore);
    router.put("/update/:small_id", movieController.updateById);    
    router.delete("/delete/title/:title", movieController.deleteByName);
    router.delete("/delete/id/:small_id", movieController.deleteById);

    app.use("/api/movies", router);
}
