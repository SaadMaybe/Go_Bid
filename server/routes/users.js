const router = require('express').Router();
let Users = require('../models/users.model.js');

router.route('/').get((req,res) => {
    Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {
    const userID = req.body.userID;
    const username = req.body.username;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const completedAuctions = req.body.completedAuctions;
    const completedBids = req.body.completedBids;
    const cancelledAuctions = req.body.cancelledAuctions;
    const cancelledBids = req.body.cancelledBids;
    const accountStatus = req.body.accountStatus;

    const newUsers = new Users({userID ,username, password, phoneNumber, completedAuctions, completedBids, cancelledAuctions, cancelledBids, accountStatus});

    newUsers.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error ' + err));
})

module.exports = router;