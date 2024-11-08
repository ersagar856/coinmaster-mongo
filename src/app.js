const express = require("express");
const cors = require("cors");
var logger = require('morgan');
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"))
app.use(cookieParser());

// import routes
const categoryRoutes = require("./routes/categoryRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");
const algorithm = require("./routes/algorithmRoutes");
const platform = require("./routes/platformRoutes");
const industry = require("./routes/industryRoutes");
const exchange = require("./routes/ExchangeRoutes.js");

//routes declaration
app.use("/api", categoryRoutes);
app.use("/api", cryptoRoutes);
app.use("/api", algorithm);
app.use("/api", platform);
app.use("/api", industry);
app.use("/api/exchange", exchange);

module.exports = app;
