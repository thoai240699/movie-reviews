import express from "express";
import MoviesController from "./movies.controller.js";

const router = express.Router();

// Define the root route
router.route("/").get(MoviesController.apiGetMovies);

export default router;
