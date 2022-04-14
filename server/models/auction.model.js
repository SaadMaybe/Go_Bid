const mongoose = require('mongoose');
const usermodel = require('./user.model.js');

const auctionschema = new mongoose.Schema({
    auctionID: {
      type: Number,
      required: true,
      unique: true,
      min: 0,
      default: 0

    },
    //on hold
    auctioner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      default: 0
    },
    itemBeingAuctioned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'items',
      required: true,
      min: 0,
      default: 0
    },
    startingTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    endingTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    auctionStatus: {
      type: String,
      required: true,
      default: "active",
      enum: ["cancelled", "active", "closed"],
    },
    listOfBids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bids',
      default: []
    }],
    highestBidValue: {
      type: Number,
      default: 0,
      min: 0
    },
    highestBidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bids',
      default: 0,
    }
  
  
  });
  


  
  const auctionmodel = mongoose.model('auctions', auctionschema);

  module.exports = auctionmodel;