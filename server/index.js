const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const jwt = require('jsonwebtoken')
const sha = require('sha256')

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
const postAnAuctionRouter = require("./routes/postanauction.js");
const createanitemRouter = require("./routes/createanitem.js");



app.use(cors());
app.use(express.json());
app.use('/', signinRouter);
app.use('/signup', signupRouter);
app.use('/users', usersRouter);
app.use('/homepage', homePageRouter);
app.use('/contactUs', contactUsRouter);
app.use('/userProfile', userProfileRouter);
app.use('/Postanauction', postAnAuctionRouter);
app.use('/createanitem', createanitemRouter);

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


/* app.get("/signup", async (req,res) => {
    const user = new UsersModel({username: req.username, password: sha(req.password)});
    await user.save();
    res.send("Signed up successfully!!")
})
 */
// app.get("/signin", async (req,res) => {
//     res.send("Signed up successfully!!")
// })

// app.get("/", async (req, res) => {
//     res.send("Hello World!");
// })

app.listen(port,()=>{
    console.log("Server is listening on port: " + process.env.PORT);
})

