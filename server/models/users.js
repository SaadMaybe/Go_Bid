const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
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
    ref: 'AuctionsModel'
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

const itemsSchema = new mongoose.Schema({
  itemID : {
    type: Number,
    required: true,
    unique: true,
    min: 0,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    
    //Have to discuss this with the team:
    enum: ["electronics", "clothing", "books", "sports", "other"],
    required: true,
  },
  pictures: {
    type: [String],
  },
  tags: {
    type: [String],
  },
  associatedAuctionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuctionsModel',
    required: true,
  },

});

const messagesSchema = new mongoose.Schema({
  messageID: {
    type: Number,
    required: true,
    unique: true,
    min: 0, 
  },
  contents: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsersModel',
    required: true,
    min: 0,
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

const auctionsSchema = new mongoose.Schema({
  auctionID: {
    type: Number,
    required: true,
    unique: true,
    min: 0,
  },
  //on hold
  auctioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsersModel',
    required: true,

  },
  itemBeingAuctioned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ItemsModel',
    required: true,
    min: 0,
  },
  startingTime: {
      type: Date,
      required: true,
  },
  endingTime: {
    type: Date,
    required: true,
  },
  auctionStatus: {
    type: String,
    required: true,
  },
  listOfBids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BidsModel',
  }]

});


const bidsSchema = new mongoose.Schema({
  bidID: {
    type: Number, 
    unique: true,
    required: true,
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsersModel',
    required: true,
  },
  amountBidded: {
    type: Number,
    required: true,
  },
  //could be an enum
  bidStatus: {
    type: String,
    required: true,
  },
});


const MessagesModel = mongoose.model('Messages', messagesSchema);
const ItemsModel = mongoose.model('Items', itemsSchema);
const BidsModel = mongoose.model('Bids', bidsSchema);
const AuctionsModel = mongoose.model('Auctions', auctionsSchema);
const UsersModel = mongoose.model('Users', usersSchema);

module.exports = UsersModel;