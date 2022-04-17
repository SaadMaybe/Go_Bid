import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

export const ViewMyAuctions = () => 
{

    const navigate = useNavigate();
    const location = useLocation();

    const [auctionList, setAuctionList] = useState([]);
    const [username, setUsername] = useState("");
    const [bidList, setBidList] = useState([]);
    const [auctionID, setAuctionID] = useState(0);
    const [id, setId] = useState('');
    const [imageList , setImageList] = useState([]);
    

    function sellAuction(e)
    {
        const hmmm = e
        console.log("Sell Auction, the auction ID is " + hmmm);
        axios.post("https://my-app-6zap7.ondigitalocean.app/viewMyAuctions/sell", {auctionID: hmmm}).then(async res =>
        {
            console.log("res is " + res.data);
            if(res.data.status === 'ok')
                alert("Auction Sold!!")
            else
                alert("Auction not Sold!")
            
            await setAuctionList([]);
            await setBidList([]);
            await setUsername("");
            await setAuctionID(0);
            // navigate("/viewMyAuctions");
            navigate("/Homepage", {state: {userID: location.state.userID, id: id}});
            
        })
        //Sells an auction to the highest bidder
    }

    function cancelAuction(e)
    {
        const hmmm = e
        console.log("Cancel Auction");
        axios.post("https://my-app-6zap7.ondigitalocean.app/viewMyAuctions/cancel", {auctionID: e}).then(async res =>
        {
            console.log("res is " + res.data);
            if(res.data.status === 'ok')
                alert("Auction cancelled!")
            else
                alert("Auction not cancelled!")
            await setAuctionList([]);
            await setBidList([]);
            await setUsername("");
            await setAuctionID(0);
            navigate("/Homepage", {state: {userID: location.state.userID, id: id}});
            
        })
        //Cancels an auction
    }

    function timeDiff(d1, d2)
    {
        var date1 = new Date(d1);
        var date2 = new Date(d2);
        var diff = date1.getTime() - date2.getTime();
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);
        var hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);
        var minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60); 
        var seconds = Math.floor(diff / (1000));

        var returnString = "";
        if(days > 0)
            if(days == 1)
                returnString += days + " day ";
            else
                returnString += days + " days ";
        if(hours > 0)
            if(hours == 1)
                returnString += hours + " hour ";
            else
                returnString += hours + " hours ";
        if(minutes > 0)
            if(minutes == 1)
                returnString += minutes + " minute ";
            else
                returnString += minutes + " minutes "; 
        if(seconds > 0)
            if(seconds == 1)
                returnString += seconds + " seconds ";
            else
                returnString += seconds + " seconds ";
        return returnString;
    }
    

    useEffect(async () => 
    {
        const hmmm = location.state.userID;
        await setId(location.state.id);
        console.log("hmmm is " + hmmm);
        axios.post('https://my-app-6zap7.ondigitalocean.app/viewMyAuctions', {userID: hmmm}).then(response => 
        {
            if(response.status === 200)
            {
                
                setAuctionList(response.data.auctionList);
                setUsername(response.data.username);
                setBidList(response.data.bidList);
                setImageList(response.data.imageList);
            }
            else
            {
                return "error";
            }
                        
        });
    }, [location.state.userID]);

    return (
        <div>
            <div className = "top-dash-user">
            <div className="back-btn"><button className="back" onClick={() => navigate('/Homepage', {state:{userID: location.state.userID, id: id}})}>&#8249;</button> </div>
            My Auctions
            </div>
            <br></br>
            <div className='past-btn'>
                <button className='past-auction' onClick={() => navigate('/ViewMyPastAuctions', {state:{userID: location.state.userID, id: id}})}>Past Auctions</button>
            </div>

            List of auctions for user {username}:
            <br></br><br></br><br></br><br></br>
                <ul>
                    { 
                    auctionList.map((auction, index) =>
                        <div className='playcards'>
                            <li key={auction.auctionID}>
                                <div className='in-text'>
                                    <img src={imageList[index]} height="144" width="256"></img>
                                    Title of the auction: {auction.itemBeingAuctioned.itemTitle}
                                    <p>   </p>
                                    {bidList[index] == auction.itemBeingAuctioned.minimumBid ? "No bids yet. Starting value for the bid is " + auction.itemBeingAuctioned.minimumBid + " " : "Highest bid: " + bidList[index] + " "}
                                    <p>   </p>
                                    Time remaining: {timeDiff(auction.endingTime, new Date())}
                                    <button className='sell' onClick={async () => {await setAuctionID(auction.auctionID); sellAuction(auction.auctionID);}}>Sell</button>
                                    <button className='cancel' onClick={async () => {await setAuctionID(auction.auctionID); cancelAuction(auction.auctionID);}}>Cancel</button> 
                                </div>

                            </li>
                        </div>
                    )}
                </ul>
            <div>
            </div>
        </div>
    )
}
