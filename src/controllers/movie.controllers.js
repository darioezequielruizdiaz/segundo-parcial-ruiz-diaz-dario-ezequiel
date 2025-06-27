import Movies from "../models/movie.model.js";
import { movieValidator } from "../validators/movieValidator.js";

export const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movies.findAll();
    res.status(200).json(allMovies);
  } catch (error) {
    res.status(500).json({
      error: "Hubo un problema con el servidor",
    });
  }
};

export const getMovieByID = async (req, res) => {
  const { id } = req.params;

  if (!isValidID(id)) {
    res.status(409).json({
      error: "Debe ingresar un ID numero entero positivo",
    });
  }

  try {
    const movie = await Movies.findByPk(id);

    if (!movie) {
      res.status(404).json({
        status: 404,
        message: "No se encontro la pelicula",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      error: "Hubo un problema con el servidor",
    });
  }
};

export const createMovie = async (req, res) => {
  const {title, director, duration, genre, description} = req.body;

  const errores = movieValidator({title, director, duration, genre, description});

  if (errores.length > 0) {
    res.status(401).json({ errores });
  }

  try {

    const createdMovie = await Movies.create({title, director, duration, genre, description});
    res.status(201).json(createdMovie);

  } catch (error) {

    res.status(500).json({
      status: 500,
      type: error.errors[0].type,
      message: error.errors[0].message,
    });
  }
};

export const updateMovie = async (req, res) => {
    const { id } = req.params;
    const movieData = req.body;
  
    if (!isValidID(id)) {
        res.status(409).json({
        error: "Debe ingresar un ID numero entero positivo",
        });
    }

    const validatedData = "title" in movieData || "director" in movieData || "duration" in movieData || "genre" in movieData || "description" in movieData;

    if (!validatedData) {
        res.status(401).json({ 
            message: "Por favor ingrese algunos de los campos necesarios para modificar la pelicula [ title, director, duration, genre ] ",
         });
    }

    const errores = movieValidator(movieData, true);

    if (errores.length > 0) {
        res.status(401).json({ errores });
    }

  try {
    const movie = await Movies.findByPk(id);

    if (!movie) {
      res.status(404).json({
        status: 404,
        message: "No se encontro la pelicula",
      });
    }
    const updatedMovie = await movie.update(movieData);
    res.status(201).json(updatedMovie);

  } catch (error) {

    res.status(500).json({
      status: 500,
      type: error.errors[0].type,
      message: error.errors[0].message,
    });
  }
};

export const deleteMovie = async (req, res) => {
      const { id } = req.params;

  if (!isValidID(id)) {
    res.status(409).json({
        status: 409,
        message: "Debe ingresar un ID numero entero positivo",
    });
  }

  try {
    const movie = await Movies.findByPk(id);

    if (!movie) {
      res.status(404).json({
        status: 404,
        message: "No se encontro la pelicula",
      });
    }

    await movie.destroy();

    res.status(200).json({
        message: "Se elimino correctamente la pelicula"
    });
  } catch (error) {
    res.status(500).json({
      error: "Hubo un problema con el servidor",
    });
  }
};

const isValidID = (id) => {
  return !isNaN(Number(id)) && Number(id) > 0;
};