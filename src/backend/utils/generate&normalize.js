const jwtService = require('../services/jwt.service.js');
const tokenServise = require('../services/token.service.js');

const normalize = ({ id, email }) => {
  return { id, email };
};

const generateTokens = async (res, user) => {
  try {
    const normalizedUser = normalize(user);
    console.log('ok normalize');

    const accessToken = await jwtService.sign(normalizedUser);
    console.log('ok sign');
    const refreshToken = await jwtService.signRefresh(normalizedUser);
    console.log('ok signrefresh');

    await tokenServise.save(normalizedUser.id, refreshToken);
    console.log('ok save');

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    console.log('ok cookie');

    return res.status(200).send({ user: normalizedUser, accessToken });
  } catch (err) {
    console.error('fail generate');
    return res.status(400).send();
  }
};

module.exports = {
  normalize,
  generateTokens,
};
