const router = require('express').Router();

router.route("/:name").get((req,res) => res.send("hello world, this is: " + req.params['name']));

module.exports = router;