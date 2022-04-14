import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const Homepage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id
    const [userID, setUserID] = useState(0);
    const [username, setUsername] = useState('');
    const [auctions, setAuctions] = useState([]);
    const [itemCategories, setItemCategories] = useState([]);
    const [bidList , setBidList] = useState([]);
    

    function myNav()
    {
        navigate("/UserProfile", {state: {userID: userID, id: id}});
    }

    useEffect(async () => 
    {
        // if (location.state !== undefined &&)
        // {
            const hmmm = location.state.userID;
        
            setUserID(location.state.userID);
            
                await axios.post('http://localhost:9000/homepage/', {userID: hmmm}).then(res => 
                {
                    setUsername(res.data.username);
                    
                    setAuctions(res.data.auctionList);
                    setItemCategories(res.data.itemCategories);
                    setBidList(res.data.bidList);

                }).catch(err => {return <div>{err}</div>});
            // }
             
            
        // }
        // else
        // {
        //     navigate("/SignIn");
        // }
    }, [location.state.userID])

    return (
        <div>
            {/* <h3>Homepage</h3> */}
            <div className='big-black'>
                <div className='inner'>
                    <ul>

                        <li key={1}>
                            <button className='boss' onClick={() => navigate('/PostAnAuction', {state: {userID : userID, id: id}})}> 
                                Post an auction
                            </button>
                        </li>

                        <li key={2}>
                            <button className='boss' onClick={() => navigate('/ViewMyAuctions', {state: {userID : userID, id: id}})}>
                                My Auctions
                            </button>
                        </li>

                        <li key={3}>
                            <button className='boss' onClick={() => navigate('/ViewMyBids', {state: {userID : userID, id: id}})}>
                                My Bids
                            </button>
                        </li>

                        <li key={4}>
                            <button className='boss' onClick={() => navigate('/ViewMyInbox', {state: {userID : userID, id: id}})}>
                                My inbox    
                            </button>
                        </li>

                        <li>
                            <button className='boss' onClick={() => navigate('/ContactUs')}>Contact us</button> 
                        </li>
                        
                        
                        <li key={5}>
                            <button className='boss' onClick={() => myNav()}> 
                                Hello there  {username}!
                            </button>
                        </li>

                        
                    
                    </ul>

                </div>
            </div>
            <br></br>
            <br></br>

            <div className='down-one'> 
            <div className='popular'>Popular Items</div>
            {
            auctions.map((auction, index) => 
            <div className='row'>
                <div className='item'>
                <img src="https://cdn.shopify.com/s/files/1/0161/0482/products/ayegear_tshirt_5_pockets_multipocket_travel_scottevest_navy.jpg?v=1538484272"></img>
                        <div className='text-desc'>
                            {/* <h12> */}
                                <b>Title</b>:{auction.itemBeingAuctioned.itemTitle}
                            {/* </h12>  */}
                            <br></br>
                            {/* <h12> */}
                                <b>Description</b>:{auction.itemBeingAuctioned.description}
                            {/* </h12> */}
                            <br></br>
                            {/* <h12> */}
                                <b>Posted by</b>: {auction.auctioner.username}
                            {/* </h12> */}
                            <br></br>
                            {/* <h12> */}
                                <b>Highest Bid: {bidList[index]}</b>
                            {/* </h12> */}
                            <button onClick={() => navigate('/DisplayAnAuction', {state: {userID: userID, auctionid: auction._id, maximumBid: bidList[index], id: id, highestBid: auction.highestBid, highestBidValue: auction.highestBidValue}})}>View Auction</button>
                        </div>

                </div>
            </div>
            )
            }
            </div>
            
        </div>

    )
}