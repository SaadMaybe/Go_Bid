import express from "express"
import cors from "cors"
import gobid from "./api/gobid.route.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/gobid", gobid);
app.use("*", (req,res) => res.status(404).json({error: "Not found"}));

export default app

