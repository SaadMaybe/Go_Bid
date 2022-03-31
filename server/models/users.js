const mongoose = require('mongoose');




const UsersSchema = new mongoose.Schema({
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
  },
  completedAuctions:{
    type: [Number],
    required: true,
  },
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



const UsersModel = mongoose.model('Users', UsersSchema);

module.exports = UsersModel;