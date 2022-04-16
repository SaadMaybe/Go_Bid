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

    function sellAuction(e)
    {
        const hmmm = e
        console.log("Sell Auction, the auction ID is " + hmmm);
        axios.post("http://localhost:9000/viewMyAuctions/sell", {auctionID: hmmm}).then(async res =>
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
        axios.post("http://localhost:9000/viewMyAuctions/cancel", {auctionID: e}).then(async res =>
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

    

    useEffect(async () => 
    {
        const hmmm = location.state.userID;
        await setId(location.state.id);
        console.log("hmmm is " + hmmm);
        axios.post('http://localhost:9000/viewMyAuctions', {userID: hmmm}).then(response => 
        {
            if(response.status === 200)
            {
                
                setAuctionList(response.data.auctionList);
                setUsername(response.data.username);
                setBidList(response.data.bidList);
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
            <div className="gobid">GoBid</div>
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
                                    Title of the auction: {auction.itemBeingAuctioned.itemTitle}
                                    <p>   </p>
                                    {bidList[index] == auction.itemBeingAuctioned.minimumBid ? "No bids yet. Starting value for the bid is " + auction.itemBeingAuctioned.minimumBid + " " : "Highest bid: " + bidList[index] + " "}

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
