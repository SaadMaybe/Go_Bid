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
    const [bidList, setBidList] = useState([]);

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
        
            <div>
                Homepage
                
                <br></br>
                <button onClick={() => myNav()}> 
                    Hello there  {username}!
                </button>
            

                <button onClick={() => navigate('/ContactUs')}>Contact us</button>                
                
                <button onClick={() => navigate('/PostAnAuction', {state: {userID : userID}})}> 
                    Post an auction
                </button>

                <button onClick={() => navigate('/ViewMyAuctions', {state: {userID : userID}})}>
                    My Auctions
                </button>

                <button onClick={() => navigate('/ViewMyBids', {state: {userID : userID}})}>
                    My Bids
                </button>

                <button onClick={() => navigate('/ViewMyInbox', {state: {userID : userID}})}>
                    My inbox    
                </button>
                

                
            </div>

            <br></br>
            <br></br>

            <div> 
            The list of auctions is:
            {
            
            auctions.map(auction => 
            <ul key={auction.auctionID}>
                <b>Title of the auction</b>:{auction.itemBeingAuctioned.itemTitle}. 
                <br></br>
                <b>Description of the item being auctioned</b>:{auction.itemBeingAuctioned.description}.
                <br></br>
                <b>Person who posted the auction</b>: {auction.auctioner.username}.
                <br></br>
                {/* <b>Current highest bid</b>: {maxVal(bidList)}. */}
               
            </ul>)
            }
            </div>
          
            
        </div>

    )
}