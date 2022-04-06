const mongoose = require('mongoose');
let auctionmodel = require('./auction.model.js');


const itemschema = new mongoose.Schema({
    itemID : {
      type: Number,
      required: true,
      unique: true,
      min: 0,
      default: 0
    },
    description: {
      type: String,
      default: "default description",
    },
    category: {
      type: String,
      default: "electronics",
      
      //Have to discuss this with the team:
      enum: ["electronics", "clothing", "books", "sports", "other"],
      required: true,
    },
    pictures: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    associatedAuctionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'auctionmodel',
      required: true,
      default: 0
    },
  
  });
  
  const itemmodel = mongoose.model('items', itemschema);

  module.exports = itemmodel;
  