const router = require('express').Router();
let UsersModel = require('../models/user.model');
const sha256 = require('sha256');

router.route("/signin").post( async (req,res) => {
    const user = await UsersModel.findOne({phoneNumber: req.body.phoneNumber, password: sha256(req.body.password)});

    if(user)
    {
        res.json({status:'ok', user: true})
        console.log("OK");
    }
    else
    {
        console.log("hre is a",user)
        res.json({ status:'error', user: false});
    }
    
})

module.exports = router;