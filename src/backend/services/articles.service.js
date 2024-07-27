const { Article } = require("../models/Article.model");

const getAll = async () => {
  const result = await Article.findAll();
  return result;
};

const post = async (title, description, url) => {
  const result = await Article.create({ title, description, url });

  return result;
};

const update = async (id, title, description, url) => {
  const [affectedRows, [updated]] = await Article.update(
    { title, description, url },
    {
      where: { id },
      returning: true,
    },
  );

  return affectedRows > 0 ? updated : null;
};

const deleteItem = async (id) => {
  const result = await Article.destroy({
    where: {
      id,
    },
  });

  return result;
};

module.exports = {
  getAll,
  post,
  deleteItem,
  update,
};
