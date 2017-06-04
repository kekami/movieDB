const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  password: { type: String, required: true },
  email: { type: String, trim: true, required: true },
  timestamp: { type: Date, default: Date.now },
  likes: { type: Array },
});

UserSchema.methods.summary = function summary() {
  const data = {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    likes: this.likes,
  };

  return data;
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
