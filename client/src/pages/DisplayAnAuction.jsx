import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';



export const DisplayAnAuction = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [amountBidded, setAmountBidded] = useState(0);
    let display = {};


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

    async function getData()
    {
        const auction = { auctionid: location.state.auctionid};
        var auctionQuery = await axios.post('http://localhost:9000/getauction', auction);
        var returnAuction = auctionQuery.data.value;
    
        const item = { itemid : returnAuction.itemBeingAuctioned}
        var itemQuery = await axios.post('http://localhost:9000/getitem', item)
        var returnItem = itemQuery.data.value;
    
    
        display["itemTitle"] = returnItem.itemTitle;
        display["Auctioneer"] = returnAuction.auctioner;
        display["Current Highest Bid"] = location.state.maximumBid;
        display["picture"] = returnItem.picture;
        display["tags"] = returnItem.tags;
        
        console.log(display);
    }

    getData();

return (
    <div>
    Title: {display["itemTitle"]}<br></br>
    Auctioneer: {display["Auctioneer"]}<br></br>
    Current Highest Bid: {display["Current Highest Bid"]}<br></br>
    Picture: {display["picture"]}<br></br>
    tags: {display["tags"]}<br></br>
    </div>
)
}