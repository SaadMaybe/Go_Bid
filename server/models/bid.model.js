const mongoose = require('mongoose');
let auctionmodel = require('./auction.model.js');
let usermodel = require('./user.model.js');
  
  const bidschema = new mongoose.Schema({
    bidID: {
      type: Number, 
      unique: true,
      required: true,
      default: 0
    },
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      default: 0
    },
    amountBidded: {
      type: Number,
      required: true,
      default: 0
    },
    //could be an enum
    bidStatus: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "accepted", "cancelled", "rejected"]
    },
    associatedAuction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'auctions',
      required: true,
      default: 0
    }
  });
 
  
  
  
  const bidmodel = mongoose.model('bids', bidschema);


module.exports = bidmodel;