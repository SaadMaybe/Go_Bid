import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';



export const DisplayAnAuction = () => {
    const location = useLocation();
    const [amountBidded, setAmountBidded] = useState(0);

    const auction = { auctionid: location.state.auctionid};

    let auctionQuery = await axios.post('http://localhost:9000/getauction', auction);

    let returnAuction = auctionQuery.value;

    let maximumBid = location.state.maximumBid;

    const item = { itemid : returnAuction.itemBeingAuctioned}
    let itemQuery = await axios.post('http://localhost:9000/getitem', item)

    let returnItem = itemQuery.value;

    const changeAmountBidded = (amountBidded) => {
        setAmountBidded(amountBidded.target.value);
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const bid = {
            bidder : location.state.userid,
            amountBidded : amountBidded,
            associatedAuction : location.state.auctionid
        }

        let s = await axios.post('http://localhost:9000/postabid/', bid);
        
        if (s.data.status !== "error")
        {
            console.log("INSIDE THE ONSUBMIT BUTTON")
            navigate("/Homepage");
        }
    }

return (
    <div>
        Title: {returnItem.itemTitle}<br></br>
        Auctioneer: {returnAuction.auctioner}<br></br>
        Current Highest Bid: {maximumBid}<br></br>
        Picture: {returnItem.picture}<br></br>
        tags: {returnItem.tags}<br></br>

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