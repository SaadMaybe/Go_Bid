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


app.use(cors());
app.use(express.json());
app.use('/signup', signupRouter);
app.use('/users', usersRouter);

const uri = process.env.GOBID_URI;
mongoose.connect(uri, {
    useNewURLParser: true
});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("DB connnected!!!")
})

/* app.get("/signup", async (req,res) => {
    const user = new UsersModel({username: req.username, password: sha(req.password)});
    await user.save();
    res.send("Signed up successfully!!")
})
 */
app.get("/signin", async (req,res) => {
    res.send("Signed up successfully!!")
})

app.get("/", async (req, res) => {
    res.send("Hello World!");
})

app.listen(port,()=>{
    console.log("Server is listening on port: " + process.env.PORT);
})

