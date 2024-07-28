const jwtService = require('../services/jwt.service.js');
const tokenServise = require('../services/token.service.js');

const normalize = ({ id, email }) => {
  return { id, email };
};

const generateTokens = async (res, user) => {
  try {
    const normalizedUser = normalize(user);

    const accessToken = await jwtService.sign(normalizedUser);
    const refreshToken = await jwtService.signRefresh(normalizedUser);

    await tokenServise.save(normalizedUser.id, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({ user: normalizedUser, accessToken });
  } catch (err) {
    return res.status(400).send();
  }
};

module.exports = {
  normalize,
  generateTokens,
};
