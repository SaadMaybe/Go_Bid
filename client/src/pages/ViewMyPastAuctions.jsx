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
        axios.post('http://localhost:9000/viewMyPastAuctions', {userID: hmmm}).then(async response => 
        {
            if(response.data.status === 'ok')
            {
                console.log("res is " + response.data.auctionList);
                await setAuctionList(response.data.auctionList);
                await setUsername(response.data.username);
                await setBidList(response.data.bidList);
                console.log("auctionList is " + auctionList);
                console.log("username is " + username);
                console.log("bidList is " + bidList);

            }
            else
            {
                return <div>error</div>;
            }
                            
        });
    }, [location.state.userID])

    return (
        <div>
<<<<<<< Updated upstream
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
                            <div className='in-text'>
                                Title of the auction: {auction.itemBeingAuctioned.itemTitle}
                                <p>   </p>
                                Highest Bid: {bidList[index]}
                            </div>
                        </li>
                    </div>
                )}
            </ul>
=======
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
                                <div className='in-text'>
                                    Title of the auction: {auction.itemBeingAuctioned.itemTitle}
                                    <p>   </p>
                                    Highest Bid: {bidList[index]}
                                </div>
                            </li>
                        </div>
                    )}
                </ul>
            </div>
>>>>>>> Stashed changes
        </div>
    </div>
    )
}