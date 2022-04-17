const mongoose = require('mongoose');


const itemschema = new mongoose.Schema({
    itemID : {
      type: Number,
      required: true,
      unique: true,
      min: 0,
      default: 0
    },
    itemTitle: {
      type: String,
      default: "Empty Title"
    },
    description: {
      type: String,
      default: "default description",
    },
    category: {
      type: String,
      default: "Other",
      
      //Have to discuss this with the team:
      //if this gets changed, then homepage.js in the server folder needs to be changed as well
      enum: ["Electronics", "Clothing", "Books", "Sports", "Other"],
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
    minimumBid: {
      type: Number,
      default: 0
    },
    Image:{
      type: Buffer,
      contentType: String,
      unique: false,
      default: 0
    }
      
  });
  
  const itemmodel = mongoose.model('items', itemschema);

  module.exports = itemmodel;
  