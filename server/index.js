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



app.use(cors());
app.use(express.json());
app.use('/', signinRouter);
app.use('/signup', signupRouter);
app.use('/users', usersRouter);
app.use('/homepage', homePageRouter);
app.use('/contactUs', contactUsRouter);

const uri = process.env.GOBID_URI;
mongoose.connect(uri, {
    useNewURLParser: true
});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("DB connnected!!!")
})


app.listen(port,()=>{
    console.log("Server is listening on port: " + process.env.PORT);
})

