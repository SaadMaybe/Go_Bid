const router = require('express').Router();
let UsersModel = require('../models/user.model');

router.route("/signin").post( async (req,res) => {
    const user = await UsersModel.findOne({phoneNumber: req.body.Number, password: req.body.Password});

    if(user)
    {
        res.json({status:'ok', user: true})
        console.log("OK")
    }
    else
    {
        console.log(user)
        res.json({ status:'error', user: false});
    }
    
})


    // router.route("/", async (req,res) => {
    // console.log("Body,", req.body.phoneNumber)
    // const user = await UsersModel.findOne({phoneNumber: req.body.phoneNumber, password: req.body.password});

    // if(user)
    // {
    //     res.json({status:'ok', user: true})
    //     console.log("OK")
    // }
    // else
    // {
    //     console.log(user)
    //     res.json({ status:'error', user: false});
    // }
    
// })

module.exports = router;