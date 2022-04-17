

const router = require('express').Router();
const mongoose = require('mongoose');

const auctionsModel = require('../models/auction.model');
const itemsModel = require('../models/item.model');
const usersModel = require('../models/user.model');
const bidsModel = require('../models/bid.model')

router.route("/").post(async (req, res) => 
{
    console.log("Onii chan");
    const userID = req.body.userID;
    const user = await usersModel.findOne({userID: userID});
    if(user)
    {
        
        const auctions = await auctionsModel.find(
            {
                auctionStatus: "closed",
                auctionEndDate: {$gt: new Date()},
                auctionStartDate: {$lt: new Date()},    
                auctioner: user._id
            })
            .populate('itemBeingAuctioned').populate('auctioner');
    
        var bidList = [];
        var imageList = [];
        for(var i = 0; i < auctions.length; i++)
        {
            var auction = auctions[i];

            var image_buffer = auction.itemBeingAuctioned.Image;
            image_buffer = "data:image/jpg;base64," + image_buffer.toString('base64');
            imageList.push(image_buffer);
            
            var bids = await bidsModel.find({associatedAuction: auction._id}).sort({bidAmount: -1});
            if(bids.length > 0)
            {
                bidList.push(bids[0].amountBidded);
            }
            else
            {
                bidList.push(auction.itemBeingAuctioned.minimumBid);
            }
        }
        if(auctions)
        {
            res.json(
                {
                    auctionList: auctions,
                    status: 'ok',
                    username: user.username,
                    bidList: bidList
                }
                );
        }    
        else
        {
            res.json({status: "error"});
        }

    }
    else
    {
        res.json({status: "error"});
    }

    

})


router.route('/sell').post(async (req, res) => 
{
    res.json({status: "ok"});
})


router.route('/cancel').post(async (req, res) =>
{
    res.json({status: "ok"});
})


module.exports = router;