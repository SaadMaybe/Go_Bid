const router = require('express').Router();
let AuctionModel = require('../models/auction.model');

router.route('/').post(async (req,res) => {

    const id = req.body.auctionid;

    const returnAuction = await AuctionModel.findOne({_id : id}).populate('auctioner');

    res.json({value : returnAuction});
})

module.exports = router;