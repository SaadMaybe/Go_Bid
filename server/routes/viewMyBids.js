const router = require('express').Router();
const usersModel = require('../models/user.model');
const auctionsModel = require('../models/auction.model');
const bidsModel = require('../models/bid.model');
const itemsModel = require('../models/item.model');

router.route("/").post( async (req,res) => 
{
    let userID = req.body.userID;
    let user = await usersModel.findOne({userID: userID});
    // // console.log("user: ", user);
    if(user)
    {
        let bids = await bidsModel.find(
            {
                bidder: user._id,
                bidStatus: "pending",
            }).populate({path: 'associatedAuction'}).populate('bidder');
        // // console.log("bids: ", bids);
        if(bids)
        {
            var itemArr = []
            for (let j = 0; j < bids.length; j++) {
                const a = bids[j];
                let myItem = await itemsModel.findOne({_id: a.associatedAuction.itemBeingAuctioned._id});
                if(myItem)
                {
                    // // console.log("KYA MASLA HAI ISKO");
                    // // console.log("My item is : ", myItem);
                    itemArr.push(myItem.itemTitle);
                }
                else
                {
                    itemArr.push("Not found");
                }
                
            }

            for (let i = 0; i < bids.length; i++) {
                const element = bids[i];
                if(element.associatedAuction)
                    if (element.associatedAuction.auctionStatus != "active") 
                        bids.splice(i, 1);                
            }
            for (let i = 0; i < itemArr.length; i++) {
                const element = itemArr[i];
                // // console.log("my life hurts\n" + element);
            }
            // console.log("Am I not fucking here?")
            res.json({status: 'ok', bidList: bids, username: user.username, itemList: itemArr});
        }
        else
        {
            // console.log("Why tf would i be here")
            res.json({status: 'error', bids: []});
        }
    }

});


router.route("/past").post( async (req,res) => 
{
    let userID = req.body.userID;
    let user = await usersModel.findOne({userID: userID});
    if(user)
    {
        let bids = await bidsModel.find(
            {
                bidder: user._id,
                bidStatus: {$ne: "pending"},
            }).populate('bidder')
            .populate({path: 'associatedAuction'})
        if(bids)
        {
            var itemArr = []
            for (let j = 0; j < bids.length; j++) {
                const a = bids[j];
                // console.log("hmm is " + a.associatedAuction._id);
                let myItem = await itemsModel.findOne({_id: a.associatedAuction.itemBeingAuctioned._id});
                if(myItem)
                {
                    itemArr.push(myItem.itemTitle);
                }
                else
                {
                    itemArr.push("Not found");
                }
                
            }
            res.json({status: 'ok', bidList: bids, username: user.username, itemList: itemArr});
        }
        else
        {
            res.json({status: 'error', bids: []});
        }
    }

});

router.route("/cancel").post( async (req,res) =>
{

    let bidID = req.body.bidID;
    let bid = await bidsModel.findOne({bidID: bidID});
    if(bid)
    {
        //Firstly, we deal with the auction that this bid was on
        let auction = await auctionsModel.findOne({_id: bid.associatedAuction});
        // console.log("idhar ao zara")
        if(auction)
        {
            var max = 0;
            var maxBidder;
            for (let i = 0; i < auction.listOfBids.length; i++) {
                let hmmm = await bidsModel.findOne({_id: auction.listOfBids[i]});
                if (hmmm.amountBidded > max)
                {
                    max = hmmm.amountBidded;
                    maxBidder = hmmm._id;
                }
                const element = auction.listOfBids[i];
                if(element.bidID == bidID)
                {
                    auction.listOfBids.splice(i, 1);
                    break;
                }
            }
            // console.log("Thora aur paas ajao");
            auction.highestBidd = maxBidder;
            auction.highestBidValue = max;
            await auctionsModel.updateOne({_id: auction._id}, {highestBidValue: max, highestBidd: maxBidder, listOfBids: auction.listOfBids});
            // auction.save();
            
            //Now we deal with the bid itself
            bid.bidStatus = "cancelled";
            await bidsModel.updateOne({_id: bid._id}, {bidStatus: "cancelled"});
            // bid.save();
            
            // console.log("sussy baka is " + bid.bidder);
            //Now we deal with the bidder
            let bidder = await usersModel.findOne({_id: bid.bidder});
            // console.log("pog?");    
            if(bidder)
            {
                let b = bidder.cancelledBids;
                bidder.cancelledBids = b + 1;
                bidder.save();

                res.json({status: 'ok'});
            }
            else
            {
                res.json({status: 'error'});
            }
        }   
        else
        {
            res.json({status: 'error', message: 'Auction not found'});
        }
    }
    else
    {
        res.json({status: 'error'});
    }

})

module.exports = router;