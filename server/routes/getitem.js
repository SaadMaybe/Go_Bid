const router = require('express').Router();
let ItemModel = require('../models/item.model');

router.route('/').post(async (req,res) => {

    const id = req.body.itemid;

    const returnItem = await ItemModel.findOne({_id : id});

    if(returnItem)
    {
        var image_buffer = returnItem.Image;
        image_buffer = "data:image/jpg;base64," + image_buffer.toString('base64');
        res.json({value : returnItem, image: image_buffer});       
    }
    else
    {
        console.log("error")
    }


})

module.exports = router;