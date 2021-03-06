const mongoose = require('mongoose');
let usermodel = require('./user.model.js');

  const messageschema = new mongoose.Schema({
    messageID: {
      type: Number,
      required: true,
      unique: true,
      min: 0, 
      default: 0
    },
    contents: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      default: "default message"
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      min: 0,
      default: 0
    },
    timeStamp: {
      type: Date,
      default: Date.now,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    
  
  });
  
const messagemodel = mongoose.model('messages', messageschema);

  
module.exports = messagemodel;
