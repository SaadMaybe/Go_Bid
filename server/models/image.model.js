const mongoose = require('mongoose');


const imageschema = new mongoose.Schema({
    imageID : {
      type: Number,
      required: true,
      unique: true,
      min: 0,
      default: 0
    },
    Image:{
        data: Buffer,
        contentType: String,
        unique: false
    }
        
  });
  
  const imagemodel = mongoose.model('image', imageschema);

  module.exports = imagemodel;   
  