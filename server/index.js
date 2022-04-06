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
const dashboardRouter = require("./routes/dashboard.js");


app.use(cors());
app.use(express.json());
app.use('/', signinRouter);
app.use('/signup', signupRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);

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

