// Nhập MoviesDAO (Data Access Object)
// Đây là một trợ lý đặc biệt biết cách giao tiếp với cơ sở dữ liệu
import MoviesDAO from "../dao/moviesDAO.js";

// Định nghĩa lớp MoviesController
// Lớp này giống như một người quản lý xử lý tất cả các thao tác liên quan đến phim
export default class MoviesController {
  // Xử lý yêu cầu GET để lấy danh sách phim có phân trang và lọc
  static async apiGetMovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage)
      : 20;

    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};

    if (req.query.rated) {
      filters.rated = req.query.rated;
    } else if (req.query.title) {
      filters.title = req.query.title;
    }

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    let response = {
      movie: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_result: totalNumMovies,
    };

    res.json(response);
  }
  // Get movie by Id movie
  static async apiGetMovieById(req, res, next){
    try{
      let id = req.params.id || {};
      let movie = await MoviesDAO.getMovieById(id);
      if(!movie){
        res.status(404).json({error: "not found"});
        return;
      }
      res.json(movie);
    } catch (e){
      console.log(`api, ${e}`);
      res.status(500).json({error: e});
    }
  }
  // Get ratings 
  static async apiGetRatings(req, res, next){
    try{
      let propertyTypes = await MoviesDAO.getRatings();
      res.json(propertyTypes);
    } catch (e){
      console.log(`api, ${e}`);
      res.status(500).json({error: e});
    }
  }
}
