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
  }, 
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  password:{
    type: String,
    /*maybe regex here?*/
    minlength: 1,
    required: true,
  },
  phoneNumber:{
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  completedAuctions:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'auctionmodel',
  }],
  completedBids:{
    type:Number,
    required: true,
  },
  cancelledAuctions:{
    type: Number,
    required: true,
  },
  cancelledBids:{
    type: Number,
    required: true,
  },
  account_status:{
    type: String,
    enum: ["admin", "user", "deactivated", "deleted"],
  }

});

const usermodel = mongoose.model('users', userschema);

module.exports = usermodel;