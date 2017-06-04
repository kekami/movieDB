const express = require('express');
const path = require('path');
const controllers = require('../controllers');

const router = express.Router();

router.post('/api/account/login', controllers.auth.login);
router.post('/api/account/register', controllers.auth.register);

router.get('/api/movies/popular', controllers.api.popularMovies);
router.get('/api/movies/toprated', controllers.api.topRatedMovies);
router.get('/api/movies/upcoming', controllers.api.upcomingMovies);
router.get('/api/movie/:id', controllers.api.movieDetails);
router.post('/api/movies/search', controllers.api.movieSearch);

router.post('/api/movie/:id/like', controllers.auth.authenticate, controllers.api.like);
router.post('/api/movie/:id/unlike', controllers.auth.authenticate, controllers.api.unlike);

router.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;
