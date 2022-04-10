const router = require('express').Router();
const mongoose = require('mongoose');

const auctionsModel = require('../models/auction.model');
const itemsModel = require('../models/item.model');
const usersModel = require('../models/user.model');

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
        if(auctions)
        {
            res.json(
                {
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

    }
    else
    {
        res.json({status: "error"});
    }

    

})


router.route('/sell').post(async (req, res) => 
{
    res.json({status: "ok"});
})


router.route('/cancel').post(async (req, res) =>
{
    res.json({status: "ok"});
})


module.exports = router;