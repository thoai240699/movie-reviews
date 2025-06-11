// Biến lưu trữ tham chiếu đến collection movies
// Giống như một con trỏ đến bảng movies trong cơ sở dữ liệu
let movies;

// Định nghĩa lớp MoviesDAO
// Lớp này xử lý tất cả các thao tác trực tiếp với cơ sở dữ liệu
export default class MoviesDAO {
  // Phương thức tĩnh để khởi tạo kết nối cơ sở dữ liệu
  // Giống như thiết lập đường dây điện thoại để nói chuyện với cơ sở dữ liệu
  static async injectDB(conn) {
    // Nếu đã có kết nối, không tạo kết nối mới
    if (movies) {
      return;
    }
    try {
      // Lấy collection movies từ cơ sở dữ liệu
      // Giống như chuẩn bị bảng movies để sử dụng
      movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection("movies");
    } catch (e) {
      console.error(`Không thể kết nối trong MoviesDAO: ${e}`);
    }
  }

  // Phương thức tĩnh để lấy phim với bộ lọc và phân trang
  // Giống như một chức năng tìm kiếm phim
  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    // Khởi tạo biến truy vấn
    // Sẽ lưu trữ các điều kiện tìm kiếm của chúng ta
    let query;

    // Nếu có bộ lọc, xây dựng truy vấn
    if (filters) {
      // Nếu tìm kiếm theo tiêu đề, sử dụng tìm kiếm văn bản
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } };
      }
      // Nếu tìm kiếm theo xếp hạng, sử dụng khớp chính xác
      else if ("rated" in filters) {
        query = { rated: { $eq: filters["rated"] } };
      }
    }

    // Biến để lưu trữ con trỏ cơ sở dữ liệu
    // Con trỏ giống như một người trỏ giúp chúng ta đọc qua các kết quả
    let cursor;
    try {
      // Thực thi truy vấn với phân trang
      // Giống như nói "cho tôi 20 phim bắt đầu từ trang 0"
      cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);

      // Chuyển đổi con trỏ thành mảng phim
      const moviesList = await cursor.toArray();

      // Lấy tổng số phim khớp với truy vấn
      const totalNumMovies = await movies.countDocuments(query);

      // Trả về cả danh sách phim và tổng số
      return { moviesList, totalNumMovies };
    } catch (e) {
      // Nếu có lỗi, trả về kết quả trống
      console.error(`Không thể thực hiện lệnh tìm kiếm, ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }
}
