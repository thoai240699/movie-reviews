import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";

// Ham bat dong bo
async function main() {
  // Tai du lieu bien moi truong
  dotenv.config();
  // Tao entity MongoClient, chua URI den MongoDB Atlas
  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
  // Tao port truy cap thong tin tu bien moi truong, Khong thi lay port 8000
  const port = process.env.PORT || 8000;
  try {
    // Tra ve 1 promise, await giup block tru khi hoan tat, connect mongoDB
    await client.connect();
    await MoviesDAO.injectDB(client);
    // Nếu không có lỗi thì sẽ chay server
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
