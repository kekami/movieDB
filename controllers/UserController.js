const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.find = ((params, isRaw) => (
  new Promise((resolve, reject) => {
    User.find(params)
      .then((users) => {
        if (isRaw === true) {
          resolve(users);
        }

        const summaries = [];
        users.forEach((user) => {
          summaries.push(user.summary());
        });

        resolve(summaries);
      })
      .catch((err) => {
        reject(err);
      });
  })
));

exports.findById = (id => (
  new Promise((resolve, reject) => {
    User.findById(id)
      .then((user) => {
        resolve(user.summary());
      })
      .catch((err) => {
        reject(err);
      });
  })
));

exports.create = (params => (
  new Promise((resolve, reject) => {
    const password = params.password;
    params.password = bcrypt.hashSync(password, 10);

    User.create(params)
      .then((user) => {
        resolve(user.summary());
      })
      .catch((err) => {
        reject(err);
      });
  })
));

exports.like = (id, movieId, title) => (
  new Promise((resolve, reject) => {
    User.findByIdAndUpdate({ _id: id }, { $push: { likes: { id: movieId, title } } }, { new: true })
      .then((user) => {
        resolve(user.summary());
      })
      .catch((err) => {
        reject(err);
      });
  })
);

exports.unlike = (id, movieId) => (
  new Promise((resolve, reject) => {
    User.findByIdAndUpdate({ _id: id }, { $pull: { likes: { id: movieId } } },
     { multi: true, new: true })
      .then((user) => {
        resolve(user.summary());
      })
      .catch((err) => {
        reject(err);
      });
  })
);
