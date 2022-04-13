const router = require('express').Router();
let AuctionModel = require('../models/auction.model');
let UsersModel = require('../models/user.model');
let ItemModel = require('../models/item.model');

router.route('/').post(async (req,res) => 
{
    await AuctionModel.find().sort({auctionID:-1}).then(async auction =>
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

        //console.log(req.body);

        var auctioner = req.body.auctioner;
        const userID = req.body.userID
        const itemTitle = req.body.itemTitle;
        const description = req.body.description;
        const category = req.body.category;
        const minimumBid = req.body.minimumBid;
        const pictures = [req.body.pictures];
        const tags = [req.body.tags];

        await ItemModel.find().sort({itemID:-1}).then(async item =>
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
            .then(() => {console.log("Item Added")})
            //.catch(err => res.status(400).json('Error: ' + err));
            
        })//.catch(err => res.status(400).json('Error: ' + err));

        const itemBeingAuctioned = await ItemModel.findOne({itemTitle: itemTitle});
        //console.log(ItemModel.findOne({itemTitle: itemTitle}));
        console.log("item Being Auctioned: ",itemBeingAuctioned.itemTitle);

        const startingTime = Date.now();
        const endingTime = (req.body.endingTime * 24 * 60 * 60 * 1000) + startingTime;

        const auctionStatus = "active";
        const listOfBids = [];

        const newAuction = await new AuctionModel({auctionID, auctioner, itemBeingAuctioned, startingTime, endingTime, auctionStatus, listOfBids});

        await newAuction.save()
        .then(() => res.json({status: 'ok', message: 'Auction added!', userID: userID}))
        .catch(err => res.json({status: 'error', message:'Error in post an auction: ' + err, userID: userID}));

    }).catch(err => {
        console.log(err)    
        res.status(400).json(err)});
})


module.exports = router;