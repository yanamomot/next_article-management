const express = require('express');
const authController = require('../controllers/auth.controller.js');
const catchError = require('../utils/catchError.js');
const authMiddleware = require('../utils/authMiddleware.js');

const authRouter = express.Router();

authRouter.post('/signup', catchError(authController.signup));
authRouter.post('/login', catchError(authController.login));

authRouter.get(
  '/activation/:activationToken',
  catchError(authController.activate),
);

// authRouter.post('/logout', catchError(authController.logout));

// authRouter.get('/refresh', catchError(authController.refresh));

module.exports = authRouter;
