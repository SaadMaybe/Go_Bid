import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

export const ViewMyPastAuctions = () =>
{

    const navigate = useNavigate();
    const location = useLocation();

    const [auctionList, setAuctionList] = useState([]);
    const [username, setUsername] = useState("");
    const [bidList, setBidList] = useState([]);


    useEffect(async () => 
    {
        const hmmm = location.state.userID
        console.log("hmmm is " + hmmm);
        axios.post('http://localhost:9000/viewMyPastAuctions', {userID: hmmm}).then(response => 
        {
            if(response.status === 200)
            {
                console.log("res is " + response.data.auctionList);
                setAuctionList(response.data.auctionList);
                setUsername(response.data.username);
                setBidList(response.data.bidList);
            }
            else
            {
                return <div>error</div>;
            }
                            
        });
    })

    return (
        <div>
            <button onClick={() => navigate('/ViewMyAuctions', {state:{userID: location.state.userID}})}>My Current Auctions</button>
            <br></br>
            List of auctions for user {username}:
            <ul>
                { 
                auctionList.map((auction, index) =>
                    <li key={auction.auctionID}>
                        Title of the auction: {auction.itemBeingAuctioned.itemTitle}
                        <p>   </p>
                        Highest Bid: {bidList[index]}
                    
                    </li>
                )}
            </ul>
        </div>
    )
}