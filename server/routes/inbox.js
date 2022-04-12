const router = require('express').Router();
const mongoose = require('mongoose');

const usersModel = require('../models/user.model');
const messagesModel = require('../models/message.model');

router.route('/').post((req, res) => 
{
    const userID = req.body.userID;
    usersModel.findOne({userID: userID}).then(user => 
    {
        if(user)
        {
            messagesModel.find({to: user._id}).then(messages => 
            {
                res.json(
                    {
                        status: 'ok',
                        username: user.username,
                        messages: messages
                    }
                );
            });
        }
        else
        {
            res.json({status: 'error'});
        }   
    })
    

})

module.exports = router;