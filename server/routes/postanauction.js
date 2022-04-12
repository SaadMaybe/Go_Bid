const router = require('express').Router();
let AuctionModel = require('../models/auction.model');
let UsersModel = require('../models/user.model');
let ItemModel = require('../models/item.model');

router.route('/').post(async (req,res) => 
{
    var itemInvalidCheck = false;
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


<<<<<<< Updated upstream
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
=======
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
            .then(() => console.log('Item added!'))
            .catch(err => {
                alert("Item Invalid")
                itemInvalidCheck = true
            });
            
        }).catch(err => res.status(400).json('Error: ' + err));
        if (itemInvalidCheck == false)
        {
            const itemBeingAuctioned = await ItemModel.findOne({itemTitle: itemTitle});
            //console.log(ItemModel.findOne({itemTitle: itemTitle}));
            // console.log(itemBeingAuctioned.itemTitle);

            const startingTime = Date.now();
            const endingTime = (req.body.endingTime * 24 * 60 * 60 * 1000) + startingTime;

            const auctionStatus = "active";
            const listOfBids = [];

            const newAuction = new AuctionModel({auctionID, auctioner, itemBeingAuctioned, startingTime, endingTime, auctionStatus, listOfBids});
            // const user = await UsersModel.findById({auction.auctioner});  //THIS IS NULL
            
            // const user = await UsersModel.findOne({phoneNumber: req.body.phoneNumber});
>>>>>>> Stashed changes

            await newAuction.save()
                .then(() => res.json({status: 'ok', message : "User Added!", id : auctioner, userID : userID}))
                .catch(err => {console.log("err is " + err);res.status(400).json('Error ' + err)});
            
        }
    });//.catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;