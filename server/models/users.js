const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  }
});

const UsersModel = mongoose.model('Users', UsersSchema);

module.exports = UsersModel;