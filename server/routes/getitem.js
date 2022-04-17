const router = require('express').Router();
let ItemModel = require('../models/item.model');

router.route('/').post(async (req,res) => {

    const id = req.body.itemid;

    const returnItem = await ItemModel.findOne({_id : id});
    
    res.json({value : returnItem})
})

module.exports = router;