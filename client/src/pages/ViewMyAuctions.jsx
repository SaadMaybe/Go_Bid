import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

export const ViewMyAuctions = () => 
{

    const navigation = useNavigate();
    const location = useLocation();

    const [auctionList, setAuctionList] = useState([]);
    const [username, setUsername] = useState("");


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
            }
            else
            {
                return "error";
            }
                        
        });
    }, [location.state.userID]);

    return (
        <div>
            List of auctions for user {username}:
            <ul>
                { 
                auctionList.map(auction =>
                    <li key={auction.auctionID}>
                        Title of the auction: {auction.itemBeingAuctioned.itemTitle}
                        <p>   </p>
                        {/* Maximum Bid on the auction:  */}
                        <button onClick={() => sellAuction(auction.auctionID)}>Sell</button>
                        <button onClick={() => cancelAuction(auction.auctionID)}>Cancel</button>                                             
                    </li>
                )}
            </ul>
        </div>
    )
}
