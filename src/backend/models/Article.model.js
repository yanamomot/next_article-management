const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(require("../db/config.json").development);

const Article = sequelize.define(
  "Article",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    published: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "articles",
    timestamps: false,
  }
);

// Article.sync({force: true});

module.exports = {
  Article,
  sequelize,
};
