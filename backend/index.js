import app from "./server.js";
import mongodb from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000;

MongoClient.connect(
    //Connecting to the database.
    process.env.GOBID_URI,
    {
        maxpoolSize: 50, //Cache of database connections maintained for future requests
        wtimeoutMS: 2500, //Write timeout
        useNewUrlParser: true //string parser is being discountinued. Allows users to use old urls.
    }
).catch(err => {
    console.log(err.stack)
    process.exit(1)})
.then(async client => {//Start the web server.
    app.listen(port, () => {
        console.log("Listening on port:", port);
    })
});