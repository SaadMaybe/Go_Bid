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
    }, [location.state.userID])

    return (
        <div>
            <div className = "top-dash-user">
            <div className="back-btn"><button className="back" onClick={() => navigate('/Homepage', {state:{userID: location.state.userID}})}>&#8249;</button> </div>
            Past Auctions
            </div>
            <div className='past-btn'>
                <button className='past-auction' onClick={() => navigate('/ViewMyAuctions', {state:{userID: location.state.userID}})}>My Current Auctions</button>
            </div>
            <br></br>
            <div className='auction-list'>
                List of auctions for user {username}:
                <ul>
                    { 
                    auctionList.map((auction, index) =>
                        <div className='playcards'>
                            <li key={auction.auctionID}>
                                Title of the auction: {auction.itemBeingAuctioned.itemTitle}
                                <p>   </p>
                                Highest Bid: {bidList[index]}
                            
                            </li>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
}