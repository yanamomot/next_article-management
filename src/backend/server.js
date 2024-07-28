const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const articlesRoute = require("./routes/articles.route.js");
const authRoute = require("./routes/auth.route.js");

function createServer() {
  const app = express();

  // app.use(cors());

  app.use(
    cors({
      origin: process.env.CLIENT_HOST,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(cookieParser());

  // Routes
  app.use("/", articlesRoute);
  app.use("/", authRoute);

  return app;
}

module.exports = {
  createServer,
};
