const mongoose = require('mongoose');
import ItemsModel from "item.js"

const AuctionsSchema = new mongoose.Schema({
    auctionID: {
        type: Integer,
        required: true
    }, 
    auctioneer: {
        type: String,
        required: true
    },
    item: {
        type: ItemsModel,
        required: true
    },
    timeRemaining: {
        type: Date,
        required: true
    },
    auctionStatus: {
        type: String,
        required: true
    },
    listOfBids: {
        type: Array,
        required: true
    }
});

const AuctionsModel = mongoose.model('Auctions', AuctionsSchema);

module.exports = AuctionsModel;