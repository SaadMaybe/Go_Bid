const mongoose = require('mongoose');
let itemmodel = require('./item.model.js');
let bidmodel = require('./bid.model.js');
let usermodel = require('./user.model.js');


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
      ref: 'usermodel',
      required: true,
      default: 0
    },
    itemBeingAuctioned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'itemmodel',
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
      default: "pending",
    },
    listOfBids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bidmodel',
      default: []
    }]
  
  });
  


  
  const auctionmodel = mongoose.model('auctions', auctionschema);

  module.exports = auctionmodel;