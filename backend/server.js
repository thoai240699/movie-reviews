import express from "express";
import cors from "cors";
import movies from "./api/movies.route.js";

// Tạo một instance ứng dụng Express
const app = express();

// Thiết lập middleware
app.use(cors());
app.use(express.json());

// Định nghĩa routes
app.use("/api/v1/movies", movies);

// Xử lý route không tồn tại
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

// Xuất ứng dụng Express đã được cấu hình
// Cho phép các file khác nhập và sử dụng ứng dụng này
export default app;
