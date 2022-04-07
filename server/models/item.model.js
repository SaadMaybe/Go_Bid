const mongoose = require('mongoose');
let auctionmodel = require('./auction.model.js');


const itemschema = new mongoose.Schema({
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
      ref: 'auctionmodel',
      required: true,
    },
  
  });
  
  const itemmodel = mongoose.model('items', itemschema);

  module.exports = itemmodel;
  