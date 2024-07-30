const jwt = require('jsonwebtoken');

require('dotenv/config');

const sign = (client) => {
  try {
    const token = jwt.sign(client, process.env.JWT_KEY);

    return token;
  } catch (err) {
    return null;
  }
};

const verify = (token) => {
  try {
    const result = jwt.verify(token, process.env.JWT_KEY);

    return result;
  } catch (err) {
    return null;
  }
};

const signRefresh = (client) => {
  try {
    const token = jwt.sign(client, process.env.JWT_REFRESH_KEY);

    return token;
  } catch (err) {
    return null;
  }
};

const verifyRefresh = (token) => {
  try {
    const result = jwt.verify(token, process.env.JWT_REFRESH_KEY);

    return result;
  } catch (err) {
    return null;
  }
};

module.exports = {
  sign,
  verify,
  signRefresh,
  verifyRefresh,
};
