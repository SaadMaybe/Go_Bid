const router = require('express').Router();
const mongoose = require('mongoose');

const usersModel = require('../models/user.model');
const auctionsModel = require('../models/auction.model');
const itemsModel = require('../models/item.model');

const messagesModel = require('../models/message.model');

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
    const auctions = await auctionsModel.find({auctionStatus: "active"}).populate('itemBeingAuctioned').populate('auctioner');
    if(auctions && user)
    {
        res.json(
            {
                itemCategories: itemsModel.schema.path('category').enumValues,
                auctionList: auctions,
                status: 'ok',
                username: user.username
            }
            );
    }
    else
    {
        res.json({status: "error"});
    }
    // const myItem = new itemsModel({itemID: 0, description: "this is a test item", category: "electronics"});
    // myItem.save().then(() => {res.json("yoyoyo")});
    // const myUser = await usersModel.findOne({userID: "1"});
    // const myItem = await itemsModel.findOne({itemID: "1"});
    // console.log(myUser.userID);
    // console.log("User: " + myUser.userID + " " + myUser._id);
    // console.log("Item: " + myItem.itemID + " " + myItem._id);
    // res.json("KEk")
    // const myAuction = new auctionsModel({auctionID: 1, auctioner: myUser._id, itemBeingAuctioned: myItem._id, startingTime: Date.now(), endingTime: Date.now() + (2 * 24 * 3600), auctionStatus: "active", listOfBids: []});
    // myAuction.save().then(() => {res.json("yoyoyo")});
});

module.exports = router;