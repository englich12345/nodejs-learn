const mongoose = require('mongoose')

const UserModel = mongoose.Schema({
  email: {
    type: String,
    required: '{PATH} is required!'
  },
  password: {
    type: String,
    required: '{PATH} is required!'
  },
  name: {
    type: String,
    required: '{PATH} is required!'
  },
  role: {
    type: String,
    required: '{PATH} is required!'
  }
},{
  timestamps: true
});

module.exports = mongoose.model('User', UserModel)
