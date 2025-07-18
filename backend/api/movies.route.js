import express from 'express'

import MoviesController from './movies.controller.js'
import ReviewsController from './reviews.controller.js'

// Định nghĩa các điểm cuối API cho các hoạt động liên quan đến phim
const router = express.Router()

router.route('').get(MoviesController.apiGetMovies)

router.route('/id/:id').get(MoviesController.apiGetMovieById)

router.route('/ratings').get(MoviesController.apiGetRatings)

router
  .route('/review')
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview)

export default router
