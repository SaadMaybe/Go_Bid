const router = require('express').Router();
let AuctionModel = require('../models/auction.model');
let UsersModel = require('../models/user.model');
let ItemModel = require('../models/item.model');
let BidModel = require('../models/bid.model');

router.route('/').post(async (req,res) => 
{
    await BidModel.find().sort({bidID:-1}).then(async bid =>
    {
        var bidID;

        if(bid.length == 0)
        {
            bidID = 0;
        }
        else
        {
            bidID = bid[0].bidID + 1;
        }

        const bidder = req.body.bidder;
        const amountBidded = req.body.amountBidded;
        const bidStatus = "pending";
        const associatedAuction = req.body.associatedAuction;

        const newBid = new BidModel({bidID, bidder, amountBidded, bidStatus, associatedAuction});

        await newBid.save()
        .then(() => res.json('Bid added!'))
        .catch(err => res.status(400).json('Error ' + err));

        let list = await AuctionModel.findOne({_id : associatedAuction}).listofBids;

        const temp = await BidModel.findOne({bidID : bidID});

        list = list.push(temp._id);

        console.log(list);
        
        
        const updateAuction = await AuctionModel.updateOne({_id: associatedAuction} , {$set : {listofBids : list}});

        await updateAuction.save()
        .then(() => res.json('Auction updated!'))
        .catch(err => res.status(400).json('Error ' + err));

    }).catch(err => res.status(400).json('Error: ' + err));


})

module.exports = router;