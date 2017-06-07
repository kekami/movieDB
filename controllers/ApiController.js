const MovieController = require('./MovieController');
const UserController = require('./UserController');

exports.popularMovies = ((req, res, next) => {
  MovieController.popular(req.query.page)
    .then(response => response.data)
    .then((movies) => {
      res.json({
        movies,
      });
    });
});

exports.topRatedMovies = ((req, res, next) => {
  MovieController.topRated(req.query.page)
    .then(response => response.data)
    .then((movies) => {
      res.json({
        movies,
      });
    });
});

exports.upcomingMovies = (req, res, next) => {
  MovieController.upcoming(req.query.page)
    .then(response => response.data)
    .then((movies) => {
      res.json({
        movies,
      });
    });
};

exports.movieDetails = (req, res, next) => {
  MovieController.details(req.params.id)
    .then(response => response.data)
    .then((details) => {
      res.json({
        details,
      });
    });
};

exports.movieSearch = (req, res, next) => {
  MovieController.search(req.body.searchterm, req.body.page)
    .then(response => response.data)
    .then((results) => {
      res.json({
        results,
      });
    });
};

exports.like = (req, res, next) => {
  UserController.like(req.decode.id, req.body.id, req.body.title)
    .then((user) => {
      res.json({
        user,
      });
    });
};

exports.unlike = (req, res, next) => {
  UserController.unlike(req.decode.id, req.body.id)
    .then((user) => {
      res.json({
        user,
      });
    });
};
