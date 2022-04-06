const router = require('express').Router();
const Users = require('../models/user.model.js');
const sha256 = require('sha256');
router.route("/").post((req, res) => 
{
    Users.find().sort({userID: -1}).then(async user => 
    {
        var userID;
        if(user.length == 0)
            userID = 0;
        else 
            userID = user[0].userID + 1;

        console.log(userID);
        const username = req.body.username;
        console.log(username);
        const password = sha256(req.body.password);
        const phoneNumber = req.body.phoneNumber;
        const completedAuctions = [];
        const completedBids = 0;
        const cancelledAuctions = 0;
        const cancelledBids = 0;
        const account_status = "user";

        const newUsers = new Users({userID ,username, password, phoneNumber, completedAuctions, completedBids, cancelledAuctions, cancelledBids, account_status});
        await newUsers.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error ' + err));
        
    }).catch(err => res.status(400).json('Error: ' + err));
    
})


module.exports = router;