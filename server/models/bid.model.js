const mongoose = require('mongoose');
let auctionmodel = require('./auction.model.js');
let usermodel = require('./user.model.js');
  
  const bidschema = new mongoose.Schema({
    bidID: {
      type: Number, 
      unique: true,
      required: true,
    },
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
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
    associatedAuction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'auctionmodel',
      required: true,
    }
  });
 
  
  
  
  const bidmodel = mongoose.model('bids', bidschema);


module.exports = bidmodel;