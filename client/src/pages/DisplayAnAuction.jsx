import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';



export const DisplayAnAuction = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [amountBidded, setAmountBidded] = useState(0);
    const [title, setTitle] = useState("");
    const [auctioneer, setAuctioneer] = useState("");
    const [maximumBid, setMaximumBid] = useState(0);
    const [picture, setPicture] = useState("");
    const [tags, setTags] = useState("");


    let display = {};


    const changeAmountBidded = (amountBidded) => {
        setAmountBidded(amountBidded.target.value);
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const userID = location.state.userID;

        const bid = {
            bidder : location.state.id,
            amountBidded : amountBidded,
            associatedAuction : location.state.auctionid
        }

        let s = await axios.post('http://localhost:9000/postabid/', bid);
        console.log(s)
        if (s.data.status !== "error")
        {
            console.log("INSIDE THE ONSUBMIT BUTTON")
            navigate("/Homepage", {state: {id: location.state.id, userID: userID}});
        }
    }

    useEffect(async () =>
    {
        const auction = { auctionid: location.state.auctionid};
        var auctionQuery = await axios.post('http://localhost:9000/getauction', auction);
        console.log("AuctionQuery: ", auctionQuery.data)
        var returnAuction = auctionQuery.data.value;
        
        const item = { itemid : returnAuction.itemBeingAuctioned}
        var itemQuery = await axios.post('http://localhost:9000/getitem', item)
        var returnItem = itemQuery.data.value;
    
        setTitle(returnItem.itemTitle);
        setAuctioneer(returnAuction.auctioneer);
        setMaximumBid(location.state.maximumBid);
        setPicture(returnItem.picture);
        setTags(returnItem.tags);


/*         display["itemTitle"] = returnItem.itemTitle;
        display["Auctioneer"] = returnAuction.auctioner;
        display["Current Highest Bid"] = location.state.maximumBid;
        display["picture"] = returnItem.picture;
        display["tags"] = returnItem.tags; */
        
    },[location.state.userID, location.state.auctionid])

    // getData();

return (
    <div>
    Title: {title}<br></br>
    Auctioneer: {auctioneer}<br></br>
    Current Highest Bid: {maximumBid}<br></br>
    Picture: {picture}<br></br>
    tags: {tags}<br></br>

    <form onSubmit={onSubmit}>

        <div className="form-group">
        <label>Enter your bid:</label>
        <input  type="number"
        required
        className="form-control"
        // value={this.state.UserName}
        onChange={changeAmountBidded}
        />
        <input type="submit" value="Post a bid" className="btn btn-primary" />
        <div className="right"></div>
        </div>
    </form>
    </div>
)
}