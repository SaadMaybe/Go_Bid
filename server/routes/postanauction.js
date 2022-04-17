const router = require('express').Router();
const multer = require('multer');

let AuctionModel = require('../models/auction.model');
let UsersModel = require('../models/user.model');
let ItemModel = require('../models/item.model');
let ImageModel = require('../models/image.model');

let upload = multer()

router.route('/').post(async (req,res) => 
{
    console.log("req files:", req.file);
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

        var auctioner = req.body.auctioner;
        console.log("auctioneer: ", req.body.auctioner);
        const userID = req.body.userID
        const itemTitle = req.body.itemTitle;

        const highestBid = req.body.highestBid;
        const highestBidValue = req.body.highestBidValue;
            
        const description = req.body.description;
        const category = req.body.category;
        const minimumBid = req.body.minimumBid;
        const pictures = [req.body.pictures];
        const tags = [req.body.tags];

        var item = await ItemModel.find().sort({itemID:-1})
        var itemID;
        if(item.length == 0)
        {
            itemID = 0;
        }
        else
        {
            itemID = item[0].itemID + 1;
        }

        let imFileBuffer = req.file.buffer;
        console.log(imFileBuffer);
        const newItem = new ItemModel({itemID, itemTitle, description, category, pictures, tags, minimumBid});
        console.log(auctionID);
        const newImage = new ImageModel({imageID: auctionID, Image: imFileBuffer});

        await newItem.save()
        .then(() => {console.log("Item Added")})
        
        await newImage.save()
        .then(() => {console.log("Image Added")})
        .catch(err => {console.log('Errorin uploading image: ' + err)});
        
        

        const itemBeingAuctioned = await ItemModel.findOne({itemTitle: itemTitle});
        //console.log(ItemModel.findOne({itemTitle: itemTitle}));
        

        const startingTime = Date.now();
        const endingTime = (req.body.endingTime * 24 * 60 * 60 * 1000) + startingTime;

        const auctionStatus = "active";
        const listOfBids = [];

        const newAuction = await new AuctionModel({auctionID : auctionID, auctioner:  auctioner, itemBeingAuctioned: itemBeingAuctioned._id, startingTime: startingTime, endingTime: endingTime, auctionStatus: auctionStatus, listOfBids: [], highestBidValue: 0, highestBid: null});

        await newAuction.save()
        .then(() => res.json({status: 'ok', message: 'Auction added!', userID: userID}))
        .catch(err => res.json({status: 'error', message:'Error in post an auction: ' + err, userID: userID}));

    }).catch(err => {
        console.log(err)    
        res.status(400).json(err)});
})


module.exports = router;