const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const jwt = require('jsonwebtoken')
const sha256 = require('sha256')

const UsersModel = require('./models/user.model')

require('dotenv').config();

const app = express();
const port  = process.env.PORT || 3001;

//Defining routers.
const signupRouter = require("./routes/signup.js")
const usersRouter = require("./routes/users.js");
const signinRouter = require("./routes/signin.js");
const homePageRouter = require("./routes/homepage.js");
const contactUsRouter = require("./routes/contactUs.js");
const userProfileRouter = require("./routes/userProfile.js");
const createAnItemRouter = require("./routes/createanitem.js");
const PostAnAuctionRouter = require("./routes/postanauction.js");
const getAuctionRouter = require("./routes/getauction.js");
const getItemRouter = require("./routes/getitem.js");
const postABidRouter = require("./routes/postabid.js");
const ViewMyAuctionsRouter = require("./routes/ViewMyAuctions.js");
const adminPortalRouter = require("./routes/adminPortal.js");
const inboxRouter = require("./routes/inbox.js");
const viewMyPastAuctionsRouter = require("./routes/viewMyPastAuctions.js");
const viewMyBidsRouter = require("./routes/viewMyBids.js");

app.use(cors());
app.use(express.json());
app.use('/', signinRouter);
app.use('/signup', signupRouter);
app.use('/users', usersRouter);
app.use('/homepage', homePageRouter);
app.use('/contactUs', contactUsRouter);
app.use('/userProfile', userProfileRouter);
app.use('/postanauction', PostAnAuctionRouter);
app.use('/createanitem', createAnItemRouter);
app.use('/getauction', getAuctionRouter);
app.use('/getitem', getItemRouter);
app.use('/postabid', postABidRouter);
app.use('/ViewMyAuctions', ViewMyAuctionsRouter);
app.use('/adminPortal', adminPortalRouter);
app.use('/viewMyInbox', inboxRouter); 
app.use('/viewMyPastAuctions', viewMyPastAuctionsRouter);
app.use('/viewMyBids', viewMyBidsRouter);

const uri = process.env.GOBID_URI;
mongoose.connect(uri, {
    useNewURLParser: true
});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("DB connnected!!!")
})

// app.use(cors());
// app.use(express.json());
// app.use('/', signupRouter);
// app.use('/signup', signupRouter);
// app.use('/users', usersRouter);


// app.get("/signup", async (req,res) => {
//     const user = new UsersModel({username: req.username, password: sha256(req.password), phoneNumber: req.phoneNumber});
//     await user.save();
//     res.send("Signed up successfully!!")
// })

// app.post("/signin", async (req,res) => {
//     const user = await UsersModel.findOne({phoneNumber: req.body.Number, password: req.body.Password});

//     if(user)
//     {
//         res.json({status:'ok', user: true})
//         console.log("OK")
//     }
//     else
//     {
//         console.log(user)
//         res.json({ status:'error', user: false});
//     }
    
// })
// app.get("/", async (req, res) => {
//     res.send("Hello World!");
// })

app.listen(port,()=>{
    console.log("Server is listening on port: " + process.env.PORT);
})

