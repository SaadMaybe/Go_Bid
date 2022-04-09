const router = require('express').Router();
let AuctionModel = require('../models/auction.model');
let UsersModel = require('../models/user.model');
let ItemModel = require('../models/item.model');

router.route('/').post((req,res) => 
{
    AuctionModel.find().sort({auctionID:-1}).then(async auction =>
    {
        var auctionID;

        if(auction.length == 0)
        {
            auctionID = 0;
        }
        else
        {
            auctionID = auction[0].auctionID + 1;
        }   

        var auctioner;
        
        const user = await UsersModel.findOne({userID : req.body.UserID});
        
        auctioner = user._id;


        const item = {
            itemTitle: req.body.itemTitle,
            description: req.body.description,
            category: req.body.category,
            minimumBid: req.body.minimumBid,
            picture: req.body.picture,
            tags: req.body.tags
        }


        await axios.post('http://localhost:9000/createanitem/', item);

        const itemBeingAuctioned = ItemModel.findOne({auctioner: auctioner})._id;

        const startingTime = Date.now();
        const endingTime = (req.body.endingTime * 24 * 60 * 60 * 1000) + startingTime;

        const auctionStatus = req.body.auctionStatus;
        const listOfBids = req.body.listOfBids;

        newAuction = new AuctionModel(auctionID, auctioner, itemBeingAuctioned, startingTime, endingTime, auctionStatus, listOfBids);

        await newAuction.save()
        .then(() => res.json('Auction added!'))
        .catch(err => res.status(400).json('Error ' + err));

        console.log("a");

    }).catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;