const { Product } = require('../models/Product.model');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(require('./config.json').development);