import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
  // Create review
  static async apiPostReview(req, res, next) {
    try {
      const moviesId = req.body.moviesId;
      const review = req.body.review;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();
      const ReviewRespond = await ReviewsDAO.addReview(
        moviesId,
        userInfo,
        review,
        date
      );
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //Update review
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const review = req.body.review;
      const date = new Date();
      const ReviewRespond = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        review,
        date
      );
      var { error } = ReviewRespond;
      if (error) {
        res.status.json({ error });
      }
      if (ReviewRespond.modifiedCount === 0) {
        throw new Error(
          'Unable to update review. User may not be original poster'
        );
      }
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Delete review
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;
      const ReviewRespond = await ReviewsDAO.deleteReview(reviewId, userId);
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
