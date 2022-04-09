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
    },
    //on hold
    auctioner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
  
    },
    itemBeingAuctioned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item',
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
      default: "active",
      enum: ["cancelled", "active", "closed"],
    },
    listOfBids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bidmodel',
    }]
  
  });
  


  
  const auctionmodel = mongoose.model('auctions', auctionschema);

  module.exports = auctionmodel;