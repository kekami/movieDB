const UserController = require('./UserController');
const AuthController = require('./AuthController');
const MovieController = require('./MovieController');
const ApiController = require('./ApiController');

module.exports = {
  user: UserController,
  auth: AuthController,
  movie: MovieController,
  api: ApiController,
};
