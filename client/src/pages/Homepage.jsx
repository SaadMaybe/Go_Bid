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

    useEffect(() => 
    {
        if (location.state !== undefined)
        {
            const hmmm = location.state.userID;
            setUserID(hmmm);
            console.log("User ID is " + userID);
            axios.post('http://localhost:9000/homepage/', {userID: userID}).then(res => 
            {
                setUsername(res.data.username);
                setAuctions(res.data.auctions);
                setItemCategories(res.data.itemCategories);

            }).catch(err => {return <div>{err}</div>});
        }
        else
        {
            navigate("/SignIn");
        }
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

                <button onClick={() => navigate('/Inbox', {state: {userID : userID}})}>
                    My inbox    
                </button>
                

                
            </div>
          
            
        </div>

    )
}