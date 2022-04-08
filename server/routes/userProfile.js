const router = require('express').Router();
const Users = require('../models/user.model.js');

router.route('/').post((req, res) => 
{
    console.log(req.body)
    const userPh = req.body.phoneNumber;
    console.log("The phone number that i got was", userPh);
    Users.find({phoneNumber: userPh})
    .then(user => 
        {
            console.log("User is", user)
            if(user.length == 0)
                res.json({status: 'error', user: false});
            else
                res.json(user[0]);   
        })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;