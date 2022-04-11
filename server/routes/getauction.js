const router = require('express').Router();
let AuctionModel = require('../models/auction.model');

router.route('/').post((req,res) => {

    const id = req.body.auctionid;

    const returnAuction = AuctionModel.findOne({_id : id});

    res.json({value : returnAuction});
})

module.exports = router;