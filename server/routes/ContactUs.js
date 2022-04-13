const router = require('express').Router();

router.route("/").get((req,res) => res.send("hello world, this is: "));

module.exports = router;