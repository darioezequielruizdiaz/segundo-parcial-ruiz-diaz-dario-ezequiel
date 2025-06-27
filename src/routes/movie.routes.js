import { Router } from "express";
import { createMovie, deleteMovie, getAllMovies, getMovieByID, updateMovie } from "../controllers/movie.controllers.js";

const movieRouter = Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieByID);
movieRouter.post("/", createMovie);
movieRouter.put("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;