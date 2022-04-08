const router = require('express').Router();
let UsersModel = require('../models/user.model');
const sha256 = require('sha256');

router.route("/signin").post( async (req,res) => {
    console.log("req ph ", typeof(sha256(req.body.Password)))
    const user = await UsersModel.findOne({phoneNumber: req.body.phoneNumber, password: sha256(req.body.Password)});
    // console.log("user.data ", user.data)
    if(user)
    {
        res.json({status:'ok', user: true})
        console.log("OK");
    }
    else
    {
        res.json({ status:'error', user: false});
    }
    
})

module.exports = router;