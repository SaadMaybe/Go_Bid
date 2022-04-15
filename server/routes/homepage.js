const router = require('express').Router();
const mongoose = require('mongoose');

const usersModel = require('../models/user.model');
const auctionsModel = require('../models/auction.model');
const itemsModel = require('../models/item.model');
const bidsModel = require('../models/bid.model');


router.route("/").post(async (req,res) => 
{
   
    /*  

    The things that we need for the homepage:
        A list of auctions
        A list of items for each auction

        A list of categories
    */
    // const hmmm = new itemsModel()
    const userID = req.body.userID;
    
    const user = await usersModel.findOne({userID: userID});
    const auctions = await auctionsModel.find(
        {
            auctionStatus: "active",
            auctionEndDate: {$gt: new Date()},
            auctionStartDate: {$lt: new Date()},
            auctioner: {$ne: user._id},
 
        })//.populate('listOfBids')
    .populate('itemBeingAuctioned').populate('auctioner')   
    
    var bidList = [];
    // console.log("Length of auctions is " + auctions.length)
    for(var i = 0; i < auctions.length; i++)
    {
        
        var auction = auctions[i];
        // console.log("Auction is " + auction)
        var bids = await bidsModel.find({associatedAuction: auction._id}).sort({amountBidded: -1});

        if(bids.length > 0)
        {
            // console.log("Bid is " + bids[0].amountBidded)
            // console.log("Bid is " + bids[1].amountBidded)
            bidList.push(bids[0].amountBidded);
        }
        else
        {
            bidList.push(auction.itemBeingAuctioned.minimumBid);
        }
    }


    // console.log(auctions)
    if(auctions && user)
    {
        res.json(
            {
                itemCategories: itemsModel.schema.path('category').enumValues,
                auctionList: auctions,
                status: 'ok',
                username: user.username,
                bidList: bidList,
                userObjID: user._id
            }
            );
    }
    else
    {
        res.json({status: "error"});
    }

});
//-------------------------------------------------

router.route("/search").post(async (req,res) => 
{
    const searchString = req.body.searchString;
    var stringArr = searchString.split(" ")
    for (let i = 0; i < stringArr.length; i++) {
        const element = stringArr[i];
        if (element.trim.length == 0)
        stringArr.splice(i, 1);        
    }
        /*  

    The things that we need for the homepage:
        A list of auctions
        A list of items for each auction

        A list of categories
    */
    // const hmmm = new itemsModel()
    const userID = req.body.userID;
    console.log("User ID in homepage/search: ",userID)
    const user = await usersModel.findOne({userID: userID});
    console.log(user)
    const auctions = await auctionsModel.find(
        {
            auctionStatus: "active",
            auctionEndDate: {$gt: new Date()},
            auctionStartDate: {$lt: new Date()},
            auctioner: {$ne: user._id},

        })//.populate('listOfBids')
    .populate('itemBeingAuctioned').populate('auctioner')   
    var auctionList = []
    var bidList = [];
    // console.log("Length of auctions is " + auctions.length)
    for(var i = 0; i < auctions.length; i++)
    {
        
        var auction = auctions[i];
        // console.log("Auction is " + auction)
        var includeTest = false;
        for (let i = 0; i < stringArr.length && !includeTest; i++) {
            if(auction.itemBeingAuctioned.itemTitle.includes(stringArr[i]))
            {
                // console.log("Item title is " + auction.itemBeingAuctioned.itemTitle);
                // console.log("the value of the string that was matched is " + stringArr[i])
                includeTest = true;
                auctionList.push(auction);
            }
            
        }
        if(includeTest)
        {
            var bids = await bidsModel.find({associatedAuction: auction._id}).sort({amountBidded: -1});

            if(bids.length > 0)
            {
                bidList.push(bids[0].amountBidded);
            }
            else
            {
                bidList.push(auction.itemBeingAuctioned.minimumBid);
            }

        }
    }


    // console.log(auctions)
    if(auctions && user)
    {
        res.json(
            {
                itemCategories: itemsModel.schema.path('category').enumValues,
                auctionList: auctionList,
                status: 'ok',
                username: user.username,
                bidList: bidList,
                userObjID: user._id
            }
            );
    }
    else
    {
        res.json({status: "error"});
    }

});

module.exports = router;