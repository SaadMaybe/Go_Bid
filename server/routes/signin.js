const router = require('express').Router();
let UsersModel = require('../models/user.model');
const sha256 = require('sha256');

router.route("/signin").post( async (req,res) => {

    const user = await UsersModel.findOne({phoneNumber: req.body.phoneNumber, password: sha256(req.body.Password), account_status: { $in: ["user", "admin"]}});
    // console.log(user)
    if(user)
    {
        s = user.userID
        id = user._id
        res.json({status:'ok', user: true, userID: s, userID_: id});
        // console.log("OK");
    }
    else
    {
        res.json({ status:'error', user: false});
    }
    
})

module.exports = router;
