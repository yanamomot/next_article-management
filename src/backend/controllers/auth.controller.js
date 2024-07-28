const { sendActivationEmail } = require("../services/email.service.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const tokenServise = require("../services/token.service.js");

const authService = require("../services/auth.service.js");
const jwtService = require("../services/jwt.service.js");

const { normalize, generateTokens } = require("../utils/generate&normalize.js");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const isExist = await authService.getOneBy("email", email);

  if (isExist) {
    return res
      .status(400)
      .send({ message: "The user for this email already exists" });
  }

  const activationToken = `${uuidv4()}${uuidv4()}${uuidv4()}${uuidv4()}`;

  const hashedPass = await bcrypt.hash(password, 10);

  await authService.create(email, hashedPass, activationToken);

  await sendActivationEmail(email, activationToken);

  return res.status(200).send();
};

const activate = async (req, res) => {
  const { activationToken } = req.params;
  const client = await authService.getOneBy("token", activationToken);

  if (!client) {
    return res
      .status(404)
      .send({ message: "The user for this email not found :(" });
  }

  client.activationToken = null;
  await client.save();

  return res.status(200).send(normalize(client));
};

// user???
const login = async (req, res) => {
  const { email, password } = req.body;

  const client = await authService.getOneBy("email", email);

  if (!client) {
    return res
      .status(400)
      .send({ error: "The user for this email not found :(" });
  }

  const isPasswordValid = await bcrypt.compare(password, client.password);

  if (!isPasswordValid) {
    return res.status(404).send({ error: "Password is wrong" });
  }

  const result = await generateTokens(res, client);

  return result;
};

const logout = async () => {};

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  const userData = await jwtService.verifyRefresh(refreshToken);
  const token = await tokenServise.getByToken(refreshToken);

  if (!userData || !token) {
    return res.status(401).send({ message: "Please register to gain access" });
  }

  const user = await authService.getOneBy("email", userData.email);

  const result = await generateTokens(res, user);

  return result;
};

module.exports = {
  signup,
  activate,
  login,
  // logout,
  // refresh,
};
