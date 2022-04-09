const router = require('express').Router();
let UsersModel = require('../models/user.model');
let auctionModel = require('../models/auction.model');

router.route('/').get((req,res) => {
    const auctions = auctionModel.find({auctioner: req.body._id});

    if(user)
    {
        res.json({auctions : auctions});
    }
    else
    {
        console.log("Error no user of this name exists");
    }
});

module.exports = router;