const router = require('express').Router();
let auctionModel = require('../models/auction.model');

let bidModel = require('../models/bid.model');

router.route('/').get((req,res) => {
    bidModel.remove({associatedAuction: req.body._id});
    auctionModel.remove({auctionID: req.body.auctionID}, {justOne : true});
});

module.exports = router;