import mongodb from 'mongodb';

let movies;
const ObjectId = mongodb.ObjectId;
// Định nghĩa lớp MoviesDAO
// Lớp này xử lý tất cả các thao tác trực tiếp với cơ sở dữ liệu
export default class MoviesDAO {
  // Khởi tạo kết nối đến collection movies trong MongoDB
  static async injectDB(conn) {
    if (movies) {
      return;
    }
    try {
      movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies');
    } catch (e) {
      console.error(`Không thể kết nối trong MoviesDAO: ${e}`);
    }
  }

  // Get Movies. Truy vấn phim với khả năng lọc theo tiêu đề, xếp hạng và phân trang kết quả
  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    let query;

    if (filters) {
      if ('title' in filters) {
        query = { $text: { $search: filters['title'] } };
      } else if ('rated' in filters) {
        query = { rated: { $eq: filters['rated'] } };
      }
    }

    let cursor;
    try {
      cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);

      const moviesList = await cursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);

      return { moviesList, totalNumMovies };
    } catch (e) {
      console.error(`Không thể thực hiện lệnh tìm kiếm, ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }

  // Get movies by id and related review
  static async getMovieById(id) {
    try {
      return await movies
        .aggregate([
          {
            $match: { _id: new ObjectId(id) },
          },
          {
            $lookup: {
              from: 'reviews',
              localField: '_id',
              foreignField: 'movie_id',
              as: 'reviews',
            },
          },
        ])
        .next();
    } catch (e) {
      console.error(`something went wrong in getMovieById: ${e}`);
      throw e;
    }
  }

  //Get ratings
  static async getRatings() {
    let ratings = [];
    try {
      ratings = await movies.distinct('rated');
      return ratings;
    } catch (e) {
      console.error(`unable to get ratings, ${e}`);
      return ratings;
    }
  }
}
