const router = require('express').Router();
const Users = require('../models/user.model.js');

router.route('/').post((req, res) => 
{
    const userPh = req.body.userID;
    Users.find({userID: userPh})
    .then(user => 
        {
            if(user.length == 0)
                res.json({status: 'error', user: false});
            else
                res.json(user[0]);   
        })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;