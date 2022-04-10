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

        console.log(req.body);

        var auctioner = req.body.auctioner;

        const itemTitle = req.body.itemTitle;
        const description = req.body.description;
        const category = req.body.category;
        const minimumBid = req.body.minimumBid;
        const pictures = [req.body.pictures];
        const tags = [req.body.tags];

        ItemModel.find().sort({itemID:-1}).then(async item =>
        {
            var itemID;
    
            if(item.length == 0)
            {
                itemID = 0;
            }
            else
            {
                itemID = item[0].itemID + 1;
            }
        
            const newItem = new ItemModel({itemID, itemTitle, description, category, pictures, tags, minimumBid});
        
            await newItem.save()
            .then(() => res.json('Item added!'))
            .catch(err => res.status(400).json('Error: ' + err));
            
        }).catch(err => res.status(400).json('Error: ' + err));

        console.log("b");
        const itemBeingAuctioned = ItemModel.findOne({auctioner: auctioner})._id;

        console.log(itemBeingAuctioned);

        const startingTime = Date.now();
        const endingTime = (req.body.endingTime * 24 * 60 * 60 * 1000) + startingTime;

        const auctionStatus = "active";
        const listOfBids = [];

        const newAuction = new AuctionModel({auctionID, auctioner, itemBeingAuctioned, startingTime, endingTime, auctionStatus, listOfBids});

        await newAuction.save()
        .then(() => res.json('Auction added!'))
        .catch(err => res.status(400).json('Error auction: ' + err));

        console.log("a");

    }).catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;