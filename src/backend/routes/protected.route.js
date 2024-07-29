const express = require("express");
const authMiddleware = require("../utils/authMiddleware");

const protectedRoute = express.Router();

protectedRoute.get("/admin", authMiddleware, async (req, res) => {
  try {
    console.log('ok route');
    return res.status(200).send();
  } catch (err) {
    // console.log("Admin route accessed");
    console.error('fail route');
  }
});

module.exports = protectedRoute;
