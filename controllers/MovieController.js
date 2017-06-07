const axios = require('axios');

const apiKey = '05c4279bf02e04417f2b645e34b88a8f';

exports.popular = (page => (
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}&language=en-US`)
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
));

exports.topRated = (page => (
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${page}&language=en-US`)
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
));

exports.upcoming = (page => (
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${page}&language=en-US`)
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
));

exports.currentlyPlaying = (() => (
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
));

exports.details = id => (
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
);

exports.search = (searchterm, page) => (
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.themoviedb.org/3/search/movie?query=${searchterm}&api_key=${apiKey}&language=en-US&page=${page}&include_adult=false`)
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
);
