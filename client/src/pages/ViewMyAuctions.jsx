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


    function sellAuction(e)
    {
        console.log("Sell Auction");
        axios.post("http://localhost:9000/viewMyAuctions/sell", {auctionID: e.target.auctonID}).then(res =>
        {
            console.log("res is " + res.data);
            
        })
        //Sells an auction to the highest bidder
    }

    function cancelAuction(e)
    {
        console.log("Cancel Auction");
        axios.post("http://localhost:9000/viewMyAuctions/cancel", {auctionID: e.target.auctionId}).then(res =>
        {
            console.log("res is " + res.data);
            
        })
        //Cancels an auction
    }


    useEffect(() => 
    {
        const hmmm = location.state.userID
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
            {/* <div className='top-dash-user'>
                <div className='back-btn'><button className='back'  onClick={() => navigate('/Homepage', {state:{userID: location.state.userID}})}>&#8249;</button></div>
            </div> */}
            <div className = "top-dash-user">
            <div className="back-btn"><button className="back" onClick={() => navigate('/Homepage', {state:{userID: location.state.userID}})}>&#8249;</button> </div>
            My Auctions
            </div>
            <br></br>
            <div className='past-btn'>
                <button className='past-auction' onClick={() => navigate('/ViewMyPastAuctions', {state:{userID: location.state.userID}})}>Past Auctions</button>
            </div>
            <div className='auction-list'>
                List of auctions for user {username}:
                <br></br><br></br><br></br><br></br>

                <ul>
                    { 
                    auctionList.map((auction, index) =>
                        <div className='playcards'>
                            <li key={auction.auctionID}>
                                Title of the auction: {auction.itemBeingAuctioned.itemTitle}
                                <p>   </p>
                                Maximum Bid on the auction: {bidList[index]};
                                <button className='sell' onClick={() => sellAuction(auction.auctionID)}>Sell</button>
                                <button className='cancel' onClick={() => cancelAuction(auction.auctionID)}>Cancel</button>                                             
                            </li>
                        </div>
                    )}
                </ul>
            </div>
            {/* <div>
                <button onClick={() => navigate('/ViewMyPastAuctions', {state:{userID: location.state.userID}})}>Past Auctions</button>
            </div> */}
        </div>
    )
}
