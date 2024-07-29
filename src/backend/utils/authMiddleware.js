const jwtService = require("../services/jwt.service");

require('dotenv/config');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.refreshToken;
  console.log('ok cookies token');

  if (!token) {
    return res.status(401).send({ error: "Access Denied" });
  }

  try {
    const verified = jwtService.verify(token);
    console.log('ok verified');
    req.user = verified;
    console.log('ok saved');
    next();
    console.log('ok go next');
  } catch (err) {
    console.error('fail middleware');
    res.status(400).send({ error: "Invalid Token" });
  }
};

module.exports = authMiddleware;
