import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";

// Ham bat dong bo
async function main() {
  // Tải cấu hình từ file .env
  dotenv.config();

  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
  const port = process.env.PORT || 8000;

  try {
    // Kết nối đến MongoDB và khởi tạo DAO
    await client.connect();
    await MoviesDAO.injectDB(client);

    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
// Thông báo lỗi khi web server error
main().catch(console.error);
