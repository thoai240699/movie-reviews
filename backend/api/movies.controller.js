// Nhập MoviesDAO (Data Access Object)
// Đây là một trợ lý đặc biệt biết cách giao tiếp với cơ sở dữ liệu
import MoviesDAO from "../dao/moviesDAO.js";

// Định nghĩa lớp MoviesController
// Lớp này giống như một người quản lý xử lý tất cả các thao tác liên quan đến phim
export default class MoviesController {
  // Phương thức tĩnh để lấy phim
  // Tĩnh có nghĩa là bạn có thể sử dụng phương thức này mà không cần tạo instance của lớp
  static async apiGetMovies(req, res, next) {
    // Lấy số phim trên mỗi trang từ query của request
    // Nếu không được chỉ định, mặc định là 20 phim mỗi trang
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage)
      : 20;

    // Lấy số trang từ query của request
    // Nếu không được chỉ định, mặc định là trang 0 (trang đầu tiên)
    const page = req.query.page ? parseInt(req.query.page) : 0;

    // Khởi tạo đối tượng bộ lọc trống
    // Sẽ lưu trữ bất kỳ tiêu chí tìm kiếm nào
    let filters = {};

    // Kiểm tra nếu có bộ lọc xếp hạng trong request
    if (req.query.rated) {
      filters.rated = req.query.rated;
    }
    // Kiểm tra nếu có bộ lọc tiêu đề trong request
    else if (req.query.title) {
      filters.title = req.query.title;
    }

    // Gọi DAO để lấy phim từ cơ sở dữ liệu
    // Giống như yêu cầu trợ lý cơ sở dữ liệu lấy phim
    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    // Tạo đối tượng phản hồi
    // Giống như đóng gói dữ liệu để gửi lại cho người dùng
    let response = {
      movie: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_result: totalNumMovies,
    };

    // Gửi phản hồi về cho client
    // Giống như giao gói hàng cho người dùng
    res.json(response);
  }
}
