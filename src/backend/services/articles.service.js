const { Article } = require("../models/Article.model");

const getAll = async () => {
  const result = await Article.findAll();
  return result;
};

const post = async (title, description, url) => {
  const result = await Article.create({ title, description, url });

  return result;
};

module.exports = {
  getAll,
  post,
};
