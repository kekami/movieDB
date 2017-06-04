const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserController = require('./UserController');
require('dotenv').config();

exports.register = ((req, res, next) => {
  const credentials = req.body;
  UserController
    .create(credentials)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 4000 });

      res.json({
        confirmation: 'success',
        user,
      });
    })
    .catch((err) => {
      res.statusMessage = 'An error occurred.';
      res.status(400).end();
    });
});

exports.login = ((req, res, next) => {
  const credentials = req.body;
  UserController
    .find({ email: credentials.email }, true)
    .then((users) => {
      if (users.length === 0) {
        res.statusMessage = 'User not found.';
        res.status(400).end();
      }

      const user = users[0];
      const passwordCorrect = bcrypt.compareSync(credentials.password, user.password);

      if (passwordCorrect === false) {
        res.statusMessage = 'Current password does not match.';
        res.status(400).end();
      }

      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 4000 });

      res.json({
        confirmation: 'success',
        user: user.summary(),
        token,
      });
    })
    .catch((err) => {
      res.statusMessage = 'An error occurred.';
      res.status(400).end();
    });
});

exports.authenticate = ((req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decode) => {
      if (error) {
        res.statusMessage = 'Invalid Token';
        res.status(500).end();
      } else {
        req.decode = decode;
        next();
      }
    });
  } else {
    res.send('Token required');
  }
});
