/*

const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  }
});

const UsersModel = mongoose.model('Users', userschema);

module.exports = UsersModel;

*/

//Changes made by taimur:
const mongoose = require('mongoose');
let auctionmodel = require('./auction.model.js');


const userschema = new mongoose.Schema({
  userID : {
    type: Number,
    required: true,
    unique: true,
    min: 0,  
    default: 0
  }, 
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    default: "default username"
  },
  password:{
    type: String,
    /*maybe regex here?*/
    minlength: 1,
    required: true,

    default: "default password"
  },
  phoneNumber:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    default: "77777",
    minLength: 1,
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    default: "someone@example.com",
  },
  completedAuctions:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'auctionmodel',
    default: []
  }],
  completedBids:{
    type:Number,
    required: true,
    default: 0
  },
  cancelledAuctions:{
    type: Number,
    required: true,
    default: 0
  },
  cancelledBids:{
    type: Number,
    required: true,
    default: 0
  },
  account_status:{
    type: String,
    enum: ["admin", "user", "deactivated", "deleted"],
    default: "user",
  }

});

const usermodel = mongoose.model('users', userschema);

module.exports = usermodel;