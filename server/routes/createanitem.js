const router = require('express').Router();
let ItemModel = require('../models/item.model');

router.route('/').post((req,res) => 
{
    ItemModel.find().sort({itemID:-1}).then(async item =>
    {
        var itemID;

        if(item.length == 0)
        {
            itemID = 0;
        }
        else
        {
            itemID = item[0].itemID + 1;
        }
        
        const itemTitle = req.body.itemTitle;
        const description = req.body.description;
        const category = req.body.category;
        const pictures = req.body.pictures;
        const tags = req.body.tags;
    
        newItem = new ItemModel(itemID, itemTitle, description, category, pictures, tags);
        
        await newItem.save()
        .then(() => res.json('Item added!'))
        .catch(err => res.status(400).json('Error ' + err));
    
    }).catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;