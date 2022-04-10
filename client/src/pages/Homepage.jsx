import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const Homepage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [userID, setUserID] = useState(0);
    const [username, setUsername] = useState('');
    const [auctions, setAuctions] = useState([]);
    const [itemCategories, setItemCategories] = useState([]);

    function myNav()
    {
        navigate("/UserProfile", {state: {userID: userID}});
    }

    useEffect(async () => 
    {
        // if (location.state !== undefined &&)
        // {
            const hmmm = location.state.userID;
            console.log("hmmm is " + hmmm);
            setUserID(location.state.userID);
            console.log("User ID is " + userID);
            // if(userID !== 0)
            // {
                await axios.post('http://localhost:9000/homepage/', {userID: hmmm}).then(res => 
                {
                    console.log("res is " + res.data.auctionList);
                    setUsername(res.data.username);
                    
                    setAuctions(res.data.auctionList);
                    setItemCategories(res.data.itemCategories);

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

                        <li>
                            <button className='boss' onClick={() => navigate('/PostAnAuction', {state: {userID : userID}})}> 
                                Post an auction
                            </button>
                        </li>

                        <li>
                            <button className='boss' onClick={() => navigate('/ViewMyAuctions', {state: {userID : userID}})}>
                                My Auctions
                            </button>
                        </li>

                        <li>
                            <button className='boss' onClick={() => navigate('/ViewMyBids', {state: {userID : userID}})}>
                                My Bids
                            </button>
                        </li>

                        <li>
                            <button className='boss' onClick={() => navigate('/ViewMyInbox', {state: {userID : userID}})}>
                                My inbox    
                            </button>
                        </li>

                        <li>
                            <button className='boss' onClick={() => navigate('/ContactUs')}>Contact us</button> 
                        </li>
                        
                        
                        <li>
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
            auctions.map(auction => 
            <div className='row'>
                <div className='item'>
                <img src="https://cdn.shopify.com/s/files/1/0161/0482/products/ayegear_tshirt_5_pockets_multipocket_travel_scottevest_navy.jpg?v=1538484272"></img>
                        <div className='text-desc'>
                            <h12><b>Title of the auction</b>:{auction.itemBeingAuctioned.itemTitle}.</h12> 
                            <br></br>
                            <h12><b>Description of the item being auctioned</b>:{auction.itemBeingAuctioned.description}.</h12>
                            <br></br>
                            <h12><b>Person who posted the auction</b>: {auction.auctioner.username}.</h12>
                            <br></br>
                            <h12><b>Highest Bid: Rs 50000</b></h12>
                        </div>

                </div>
            </div>
            )
            }
            </div>
            
        </div>

    )
}