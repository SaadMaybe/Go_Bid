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
    const [description, setDescription] = useState("");
    const [aucComp, setAucComp] = useState(0);
    const [aucCanc, setAucCanc] = useState(0);
    const [aucUsername, setAucUsername] = useState("");

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
            associatedAuction : location.state.auctionid,
            
            currentBid : location.state.highestBidValue,
            BidID : location.state.highestBid
        }
        
        if (amountBidded > location.state.highestBidValue)
        {  
            let s = await axios.post('https://my-app-6zap7.ondigitalocean.app/postabid/', bid);
            console.log("S: ", s)
            if (s.data.status !== "error")
            {
                console.log("INSIDE THE ONSUBMIT BUTTON")
                navigate("/Homepage", {state: {id: location.state.id, userID: userID}});
            }
            else
            {
                alert("Bid Not Placed")
            }
        }
        else
        {
            alert("Bid lesser than minimum Bid")
        }
        
    }

    useEffect(async () =>
    {
        const auction = { auctionid: location.state.auctionid};
        var auctionQuery = await axios.post('https://my-app-6zap7.ondigitalocean.app/getauction', auction);
        console.log("AuctionQuery: ", auctionQuery.data)
        var returnAuction = auctionQuery.data.value;
        
        const item = { itemid : returnAuction.itemBeingAuctioned}
        var itemQuery = await axios.post('https://my-app-6zap7.ondigitalocean.app/getitem', item)
        var returnItem = itemQuery.data.value;

        setMaximumBid(location.state.highestBidValue)
        setTitle(returnItem.itemTitle);
        setAucUsername(returnAuction.auctioner.username);
        // console.log("i hope you die " + returnAuction.auctioner.username);
        setAucCanc(returnAuction.auctioner.cancelledAuctions);

        const hmmm = returnAuction.auctioner.completedAuctions;
        let i = 0;
        for (i = 0; i < hmmm.length; i++);
        setAucComp(i);
        

        // setMaximumBid(location.state.maximumBid);
        setPicture(returnItem.picture);
        setTags(returnItem.tags);
        setDescription(returnItem.description);

        // console.log("maximum bid IN displayAnAuction: ", maximumBid)


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
    Description: {description}<br></br>
    Auctioner: {aucUsername}<br></br>
    Auctioner's Completed auctions: {aucComp}<br></br>
    Auctioner's Cancelled auctions: {aucCanc}<br></br>
    Current Highest Bid: {maximumBid}<br></br>
    Location: {picture}<br></br>
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