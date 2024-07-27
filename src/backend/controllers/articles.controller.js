const articlesService = require("../services/articles.service");

// Route to get all articles
const get = async (req, res) => {
  try {
    const articles = await articlesService.getAll();
    return res.status(200).send(articles);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const post = async (req, res) => {
  try {
  const {title, description, url} = req.body;

  const result = await articlesService.post(title, description, url);

  return res.send(result).status(201);
} catch (error) {
  return res.status(500).send({ error: "Internal Server Error" });
}
};

module.exports = { get, post, 
  // patch, deleting
 };
