const router = require('express').Router();
const mongoose = require('mongoose');

const usersModel = require('../models/user.model');
const itemsModel = require('../models/item.model');
const auctionsModel = require('../models/auction.model');
const bidsModel = require('../models/bid.model');

router.route("/").post(async (req, res) => {
    const userID = req.body.userID;
    const user = await usersModel.findOne({ userID: userID });
    if (user) {
        res.json(
            {
                status: 'ok',
                username: user.username
            }
        );
    }
    else {
        res.json(
            {
                status: 'error',
                username: 'User not found'
            }
        );
    }

})

router.route("/searchUsername").post(async (req, res) => {
    
    
    const username = req.body.username;
    // console.log("The username that i got was " + username);

    const user = await usersModel.find({ username: username, account_status: 'user' });
    if (user) {
        res.json(
            {
                status: 'ok',
                userArr: user
            }
        );
    }
    else {
        res.json(
            {
                status: 'error',
                userArr: 'User not found'
            }
        );
    }

});


router.route("/searchPhoneNumber").post(async (req, res) => {

    const phoneNumber = req.body.phoneNumber;
    const user = await usersModel.find({ phoneNumber: phoneNumber, account_status: "user" });
    if (user) {
        res.json(
            {
                status: 'ok',
                userArr: user
            }
        );
    }
    else {
        res.json(
            {
                status: 'error',
                userArr: 'User not found'
            }
        );
    }

});

router.route("/searchAuctioner").post(async (req, res) => {
    const auctioner = req.body.auctioner;
    const user = await usersModel.find({username: auctioner, account_status: 'user' });
    var auctions = []
    for (let i = 0; i < user.length; i++) {
        let auction = await auctionsModel.find({ auctioner: user[i]._id, auctionStatus: "active" }).populate('itemBeingAuctioned').populate('auctioner');
        for (var j = 0; j < auction.length; j++) {
            auctions.push(auction[j]);
        }
    }

    for (let i = 0; i < auctions.length; i++) {
        let auction = auctions[i];
        let maxBid = await bidsModel.find({ auctionID: auction._id }).sort({ bidAmount: -1 }).limit(1);
        if (maxBid.length > 0) {
            auction.maxBid = maxBid[0].bidAmount;
        }
        else {
            auction.maxBid = auction.itemBeingAuctioned.minimumBid;
        }

    }

    if (auctions.length > 0) {
        // console.log("auctions are\n" + auctions);
        res.json(
            {
                status: 'ok',
                auctions: auctions
                
            }
        );
    }
    else {
        res.json(
            {
                status: 'error',
                auctions: 'Auctions not found'
            }
        );
    }

})

router.route("/searchItemName").post(async (req, res) => {
    const itemName = req.body.itemName;

    // console.log("The name of the item is " + itemName);
    const items = await itemsModel.find({ itemTitle: itemName });
    // console.log("The items are " + items);
    var auctions = [];
    for (var i = 0; i < items.length; i++) {
        var auction = await auctionsModel.find({ itemBeingAuctioned: items[i]._id, auctionStatus: "active" }).populate('itemBeingAuctioned').populate('auctioner');
        // console.log("The auction is " + auction);
        for (var j = 0; j < auction.length; j++) {
            // console.log("hmmm")
            if (auction[j].auctioner.account_status == "user")
                auctions.push(auction[j]);
        }
    }
    for (let i = 0; i < auctions.length; i++) {
        let auction = auctions[i];
        let maxBid = await bidsModel.find({ auctionID: auction._id }).sort({ bidAmount: -1 }).limit(1);
        if (maxBid.length > 0) {
            auction.maxBid = maxBid[0].bidAmount;
        }
        else {
            auction.maxBid = auction.itemBeingAuctioned.minimumBid;
        }

    }

    if (auctions.length > 0) {
        res.status(200).json(
            {
                status: 'ok',
                auctions: auctions
            }
        );
    }
    else {
        res.json(
            {
                status: 'error',
                auctions: 'Item not found'
            }
        );
    }

})

router.route("/banUser").post(async (req, res) => {
    const userID = req.body.userID;
    const user = await usersModel.findOneAndUpdate({ userID: userID }, { $set: { account_status: 'banned' } }, { new: true });
    console.log("User is "+ user)
    const auctions = auctionsModel.updateMany({ auctioner: user._id }, { $set: { auctionStatus: 'cancelled' } }, { new: true });
    for (let o = 0; o < auctions.length; o++) {
        const element = auctions[o];
        console.log("Auction is " + element);
        
    }
    // res.json("Death is not too bad after all")

    //     if (err) {
    //         res.json(
    //             {
    //                 status: 'error',
    //                 message: 'Error banning user'
    //             }
    //         );
    //     }
    //     else {
    //         //delete all auctions made by the user
    //         auctionsModel.updateMany({ auctioner: userID }, { $set: { auctionStatus: 'cancelled' } }, { new: true }, (err, auction) => {
    //             if (err) {
    //                 res.json(
    //                     {
    //                         status: 'error',
    //                         message: 'Error banning user'
    //                     }
    //                 );
    //             }
    //             else 
    //             {
    //                 //delete all those bids on that auction
    //                 //will look at this later
    //                 // bidsModel.updateMany({ associatedAuction: auction._id }, { $set: { bidStatus: 'cancelled' } }, { new: true }, (err, bid) => {
    //                 //     if (err) {
    //                 //         res.json(
    //                 //             {
    //                 //                 status: 'error',
    //                 //                 message: 'Error cancelling '
    //                 //             }
    //                 //         );
    //                 //     }
    //                     // else {
    //                         //message of deletion here
    //                         //delete all the bids made by the user
    //                         bidsModel.updateMany({ bidder: userID }, { $set: { bidStatus: 'cancelled' } }, { new: true }, (err, bid) => {
    //                             if (err) {
    //                                 res.json(
    //                                     {
    //                                         status: 'error',
    //                                         message: 'Error deleting bids'
    //                                     }
    //                                 );
    //                             }
    //                             else {
    //                                 res.json(
    //                                     {
    //                                         status: 'ok',
    //                                         username: user.username
    //                                     }
    //                                 );
    //                             }
    //                         })
    //                     // }
    //                 // })
                    
                    
    //             }
    //         })

    //     }
    // })
});


router.route("/deleteAuction").post(async (req, res) => {
    const auctionID = req.body.auctionID;
    auctionsModel.findOneAndUpdate({ _id: auctionID }, { $set: { auctionStatus: 'cancelled' } }, { new: true }, (err, auction) => {
        if (err) {
            res.json(
                {
                    status: 'error',
                    message: 'Error cancelling auction'
                }
            );
        }
        else {
            bidsModel.updateMany({ associatedAuction: auctionID }, { $set: { bidStatus: 'cancelled' } }, { new: true }, (err, bid) => {
                if (err) {
                    res.json(
                        {
                            status: 'error',
                            message: 'Error banning user'
                        }
                    );
                }
                else {
                    //message notification here
                    // var myItem = auction.populate('itemBeingAuctioned').itemBeingAuctioned.itemTitle;
                    res.json(
                        {
                            status: 'ok',
                            auctionName: auction.populate('itemBeingAuctioned').itemBeingAuctioned.itemTitle
                        }
                    );
                }


            })
        }
    })
});


module.exports = router
