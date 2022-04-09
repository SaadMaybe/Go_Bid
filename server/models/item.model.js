const mongoose = require('mongoose');
let auctionmodel = require('./auction.model.js');


const itemschema = new mongoose.Schema({
    itemID : {
      type: Number,
      required: true,
      unique: true,
      min: 0,
    },
    itemTitle: {
      type: String,
      default: "Empty Title"
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      default: "Other",
      
      //Have to discuss this with the team:
      enum: ["Electronics", "Clothing", "Books", "Sports", "Other"],
      required: true,
    },
    minimumBid: {
      type: Number,
      default: 0
    },
    pictures: {
      type: [String],
    },
    tags: {
      type: [String],
    },
  });
  
  const itemmodel = mongoose.model('items', itemschema);

  module.exports = itemmodel;
  