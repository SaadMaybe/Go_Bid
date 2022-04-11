const router = require('express').Router();
let ItemModel = require('../models/item.model');

router.route('/').post((req,res) => {

    const id = req.body.itemid;

    const returnItem = ItemModel.findOne({_id : id});

    res.json({value : returnItem})
})

module.exports = router;