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
        console.log("associated auction:" + associatedAuction);
        const newBid = new BidModel({bidID, bidder, amountBidded, bidStatus, associatedAuction});

        // console.log("L29 before save");
        await newBid.save()
        .then(() => { console.log('Bid added!') })
        // .catch(err => res.status(400).json('Error ' + err));

        
        let list2 = await AuctionModel.findOne({_id : associatedAuction});

        let list = list2.listOfBids

        const temp = await BidModel.findOne({bidID : bidID});

        list.push(temp._id);

        // console.log("fasfasf:", list);
        const updateAuction = await AuctionModel.updateOne({_id: associatedAuction} , {$set : {listOfBids : list, highestBidValue : req.body.amountBidded, highestBid : req.body.bidID}});
        // console.log("L46: ")
        // await updateAuction.save()
        res.json('Auction updated!')
       // .catch(err => res.status(400).json('Error ' + err));


    }).catch(err => res.status(400).json('Error: ' + err));


})

module.exports = router;