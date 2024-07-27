const express = require("express");
const cors = require("cors");
const articlesRoute = require("./routes/articles.route.js");

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/", articlesRoute);

  return app;
}

module.exports = {
  createServer,
};
