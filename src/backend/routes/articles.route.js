const articlesController = require("../controllers/articles.controller");

const express = require("express");
const router = express.Router();

router.get("/articles", articlesController.get);
router.post("/create", articlesController.post);
router.patch("/update/:id", articlesController.patch);
router.delete("/delete/:id", articlesController.deleting);

module.exports = router;
