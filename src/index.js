const dotenv = require("dotenv");
const connectDB = require("./config/database");
const app = require("./app.js");
dotenv.config({
  path: "./.env",
});


const host = process.env.HOST || "localhost";
const serverPort = process.env.SERVER_PORT || 8000; // Port for Express server
const basePath = process.env.BASE_URL || "";

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(serverPort, () => {
        const fullUrl = `http://${host}:${serverPort}${basePath}`;
        console.log(`Server is running at: ${fullUrl}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
