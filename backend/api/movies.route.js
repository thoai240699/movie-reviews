// Import Express framework
// Express is like a traffic controller for web requests
import express from "express";
// Import the MoviesController which contains the actual logic for handling movie-related requests
// Think of this as the brain that processes movie-related operations
import MoviesController from "./movies.controller.js";

// Create a new router instance
// A router is like a map that tells the application how to handle different URL paths
const router = express.Router();

// Define the root route ("/")
// When someone visits the root URL, it will trigger the apiGetMovies function
// GET is like asking for information (like asking for a list of movies)
router.route("/").get(MoviesController.apiGetMovies);

// Export the router so it can be used in other files
// This is like sharing the map with the rest of the application
export default router;
