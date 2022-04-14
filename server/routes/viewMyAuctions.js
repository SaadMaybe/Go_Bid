const router = require('express').Router();
const mongoose = require('mongoose');

const auctionsModel = require('../models/auction.model');
const itemsModel = require('../models/item.model');
const usersModel = require('../models/user.model');
const bidsModel = require('../models/bid.model');
const messagesModel = require('../models/message.model')

router.route("/").post(async (req, res) => 
{
    // console.log("Kill me quickly, so that i don't feel any more pain")
    const userID = req.body.userID;
    const user = await usersModel.findOne({userID: userID});
    if(user)
    {
        // console.log("I just love being ")
        const auctions = await auctionsModel.find(
            {
                auctionStatus: "active",
                auctionEndDate: {$gt: new Date()},
                auctionStartDate: {$lt: new Date()},    
                auctioner: user._id
            })
            .populate('itemBeingAuctioned').populate('auctioner')//.populate('listOfBids');
        if(auctions.length > 0)
        {
            var bidList = [];
            for(var i = 0; i < auctions.length; i++)
            {
                var auction = auctions[i];
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
            res.json({
                auctionList: [],
                status: 'ok',
                username: user.username,
                bidList: []
            })
        }
        
    }
    else
    {
        res.json({status: "error"});
    }

    

})


router.route('/sell').post(async (req, res) => 
{
//     const auctionID = req.body.auctionID;
//     const auction = await auctionsModel.findOne({auctionID: auctionID});
//     console.log(auction)

//     const kek = await usersModel.findOne({username: "taimur"});
//     const myBid = new bidsModel({bidID: 3, amountBidded: 500000, bidStatus: "pending", associatedAuction: auction._id, bidder: kek._id});

//     await myBid.save();
//     var sQue = await auctionsModel.findOne({auctionID: auctionID});
//     var hmmm = sQue.listOfBids;
//     hmmm.push(myBid._id);
//     await auctionsModel.updateOne({auctionID: auctionID}, {listOfBids: hmmm}, {new: true});


//     res.json({status: "ok"});
// });

    const auctionID = req.body.auctionID;
    const auction = await auctionsModel.findOne({auctionID: auctionID}).populate('itemBeingAuctioned').populate('auctioner');
    // console.log(auction);
    if(auction)
    {
        const highestBid = await bidsModel.find({associatedAuction: auction._id}).sort({amountBidded: -1}).limit(1)
        if(highestBid.length > 0)
        {
            try
            {
                const highestBidder = await highestBid[0].populate('bidder');
                
                //Firstly, we close the auction
                await auctionsModel.updateOne({auctionID: auctionID}, {auctionStatus: "closed"}, {new: true});
                console.log("I am done with closing the auction");


                //Then, we tell the highest bidder that they won the auction
                var maxMessID = await messagesModel.find({}).sort({messageID: -1}).limit(1);
                var newMessID = 0;
                if(maxMessID.length > 0)
                {
                    newMessID = maxMessID[0].messageID + 1;
                }
                else
                {
                    newMessID = 1;
                }
                await messagesModel.create({messageID: newMessID, to: highestBidder.bidder._id, contents: "You won the auction for " + auction.itemBeingAuctioned.itemTitle + " with a bid of " + highestBidder.amountBidded + "!\nHere are the contact details of the auctioner so that you may contact them: " + "Username: " + auction.auctioner.username + "\nEmail:" + auction.auctioner.email + "\nPhone Number:" + auction.auctioner.phoneNumber});

                //Then, we will tell the auctioner that their auction has been sold
                maxMessID = await messagesModel.find({}).sort({messageID: -1}).limit(1);
                newMessID = maxMessID[0].messageID + 1;
                
                await messagesModel.create({messageID: newMessID, to: auction.auctioner._id, contents: "Your auction for " + auction.itemBeingAuctioned.itemTitle + " has been sold!\nHere are the contact details of the highest bidder so that you may contact them: " + "Username: " + highestBidder.bidder.username + "\nEmail:" + highestBidder.bidder.email + "\nPhone Number:" + highestBidder.bidder.phoneNumber});
                console.log("I'm done with sending the messages")

                //Then, we wil cancel all of the bids on the auction
                var bids = await bidsModel.find({associatedAuction: auction._id}).populate('bidder');
                for(var i = 0; i < bids.length; i++)
                {
                    let everyBidID = bids[i].bidID;
                    await bidsModel.updateOne({bidID: everyBidID}, {bidStatus: "rejected"});
                }
                await bidsModel.updateOne({bidID: highestBid[0].bidID}, {bidStatus: "accepted"});

                //We'll also send a message to the bidders           
                maxMessID = await messagesModel.find({}).sort({messageID: -1}).limit(1);
                newMessID = maxMessID[0].messageID + 1;
                for(var i = 0; i < bids.length; i++)
                {
                    if(bids[i].bidStatus != "accepted")
                    {
                        await messagesModel.create({messageID: newMessID, to: bids[i].bidder._id, contents: "Your bid on the auction for " + auction.itemBeingAuctioned.itemTitle + " has been rejected."});   
                        newMessID += 1;
                    }
                        
                }


                console.log("I'm done with handling the bids as well")

                

                
                //Now, we increment certain counters and arrays (which imo, suck)
                //First, we will consider the bidder
                await usersModel.updateOne({userID: highestBidder.bidder.userID}, {completedBids: highestBidder.bidder.completedBids + 1}, {new: true});

                //Then, we will consider the auctioner
                var completedA = auction.auctioner.completedAuctions
                completedA.push(auction._id);
                await usersModel.updateOne({userID: auction.auctioner.userID}, {completedAuctions: completedA}, {new: true});

                res.json({status: 'ok', message: "Auction has been sold!"});
            }
            catch(err)
            {
                console.log(err);
            }
            
        }
        else 
        {
            res.json("Murder me please, I can't take it anymore")
        }
        
    }
    else
    {
        res.json({status: "error"});
    }

})


router.route('/cancel').post(async (req, res) =>
{
    const auctionID = req.body.auctionID;
    const auction = await auctionsModel.findOne({auctionID: auctionID}).populate('itemBeingAuctioned').populate('auctioner');
    if(auction)
    {
        //We cancel the auction
        await auctionsModel.updateOne({auctionID: auctionID}, {auctionStatus: "cancelled"});

        //We then get the list of all the bidders on the auction
        var bids = await bidsModel.find({associatedAuction: auction._id}).populate('bidder');
        for(var i = 0; i < bids.length; i++)
        {
            await bidsModel.updateOne({bidID: bids[i].bidID}, {bidStatus: "rejected"});
        }

        //We send a message to the bidders as well
        var maxMessID = await messagesModel.find({}).sort({messageID: -1}).limit(1);
        var newMessID = 0;
        if(maxMessID.length > 0)
        {
            newMessID = maxMessID[0].messageID + 1;
        }
        else
        {
            newMessID = 1;
        }
        for(var i = 0; i < bids.length; i++)
        {
            await messagesModel.create({messageID: newMessID, to: bids[i].bidder._id, contents: "Your bid on the auction for " + auction.itemBeingAuctioned.itemTitle + " has been cancelled."});
            newMessID += 1;
        }


        
        //We then send a message to the auctioner
        maxMessID = await messagesModel.find({}).sort({messageID: -1}).limit(1);
        newMessID = maxMessID[0].messageID + 1;
        
        await messagesModel.create({messageID: newMessID, to: auction.auctioner._id, contents: "Your auction for " + auction.itemBeingAuctioned.itemTitle + " has been cancelled!"});

        //We increase the number of cancelled auctions for the user by 1
        await usersModel.updateOne({userID: auction.auctioner.userID}, {cancelledAuctions: auction.auctioner.cancelledAuctions + 1}, {new: true});
        
        res.json({status: 'ok', message: "Auction has been cancelled!"});

    }
    else
    {
        res.json({status: "error"});

    }
})


module.exports = router;