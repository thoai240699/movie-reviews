// Nhập các module cần thiết
// express: Một framework web cho Node.js giúp tạo ứng dụng web dễ dàng
import express from "express";
// cors: Middleware cho phép Cross-Origin Resource Sharing (CORS)
// Cho phép API của bạn được truy cập từ các domain khác nhau
import cors from "cors";
// Nhập các route phim từ file riêng biệt
// Giúp tổ chức code bằng cách tách biệt các định nghĩa route
import movies from "./api/movies.route.js";

// Tạo một instance ứng dụng Express
const app = express();

// Bật CORS cho tất cả các route
// Cho phép các domain khác gửi request đến API của bạn
app.use(cors());

// Phân tích các request body dạng JSON
// Cho phép bạn truy cập dữ liệu request trong req.body
app.use(express.json());

// Gắn các route phim tại /api/v1/movies
// Tất cả các route được định nghĩa trong movies.route.js sẽ được thêm tiền tố /api/v1/movies
app.use("/api/v1/movies", movies);

// Xử lý lỗi 404 cho các route không xác định
// Dấu * có nghĩa là middleware này sẽ bắt tất cả các route không khớp với các route trên
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

// Xuất ứng dụng Express đã được cấu hình
// Cho phép các file khác nhập và sử dụng ứng dụng này
export default app;
