const router = require('express').Router();
let AuctionModel = require('../models/auction.model');

router.route('/').post((req,res) => 
{
    const auctionID = req.body.auctionID;
    const auctioner = req.body.auctioner;
    const itemBeingAuctioned = req.body.itemBeingAuctioned;
    const startingTime = Date.now();
    const endingTime = (req.body.endingTime * 24 * 60 * 60 * 1000) + startingTime;
    const auctionStatus = req.body.auctionStatus;
    const listOfBids = req.body.listOfBids;

    newAuction = new AuctionModel(auctionID, auctioner, itemBeingAuctioned, startingTime, endingTime, auctionStatus, listOfBids);

    newAuction.save()
    .then(() => res.json('Auction added!'))
    .catch(err => res.status(400).json('Error ' + err));
})


module.exports = router;