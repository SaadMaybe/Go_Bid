import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const SearchResults = () => {

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
                console.log("Posting Search Results.jsx L31: ", location.state.userID)
                await axios.post('https://my-app-6zap7.ondigitalocean.app/homepage/search', {userID: hmmm, searchString: location.state.searchString}).then(async res => 
                {
                    await setUsername(res.data.username);
                    await setAuctions(res.data.auctionList);
                    await setItemCategories(res.data.itemCategories);
                    await setBidList(res.data.bidList);
                    console.log("User name is " + username);
                    console.log("Auction list is " + auctions[0]);

                }).catch(err => {return <div>{err}</div>});
    }, [location.state.userID])

    return (
        // <div>
        //     {/* <h3>Homepage</h3> */}
        //     <div className='big-black'>
        //         <div className='inner'>
        //             <ul>

        //                 <li key={1}>
        //                     <button className='boss' onClick={() => navigate('/PostAnAuction', {state: {userID : userID, id: id}})}> 
        //                         Post an auction
        //                     </button>
        //                 </li>

        //                 <li key={2}>
        //                     <button className='boss' onClick={() => navigate('/ViewMyAuctions', {state: {userID : userID, id: id}})}>
        //                         My Auctions
        //                     </button>
        //                 </li>

        //                 <li key={3}>
        //                     <button className='boss' onClick={() => navigate('/ViewMyBids', {state: {userID : userID, id: id}})}>
        //                         My Bids
        //                     </button>
        //                 </li>

        //                 <li key={4}>
        //                     <button className='boss' onClick={() => navigate('/ViewMyInbox', {state: {userID : userID, id: id}})}>
        //                         My inbox    
        //                     </button>
        //                 </li>

        //                 <li>
        //                     <button className='boss' onClick={() => navigate('/ContactUs')}>Contact us</button> 
        //                 </li>
                        
                        
        //                 <li key={5}>
        //                     <button className='boss' onClick={() => myNav()}> 
        //                         Hello there {username}!
        //                     </button>
        //                 </li>

                        
                    
        //             </ul>

        //         </div>
        //     </div>
        //     <br></br>
        //     <br></br>

        //     <div className='down-one'> 
        //     <div className='popular'>search for {location.state.searchString}</div>
        //     {
        //     auctions.map((auction, index) => 
        //     <div className='row'>
        //         <div className='item'>
        //         <img src="https://cdn.shopify.com/s/files/1/0161/0482/products/ayegear_tshirt_5_pockets_multipocket_travel_scottevest_navy.jpg?v=1538484272"></img>
        //                 <div className='text-desc'>
        //                     {/* <h12> */}
        //                         <b>Title</b>:{auction.itemBeingAuctioned.itemTitle}
        //                     {/* </h12>  */}
        //                     <br></br>
        //                     {/* <h12> */}
        //                         <b>Description</b>:{auction.itemBeingAuctioned.description}
        //                     {/* </h12> */}
        //                     <br></br>
        //                     {/* <h12> */}
        //                         <b>Posted by</b>: {auction.auctioner.username}
        //                     {/* </h12> */}
        //                     <br></br>
        //                     {/* <h12> */}
        //                         <b>Highest Bid: {bidList[index]}</b>
        //                     {/* </h12> */}
        //                     <button onClick={() => navigate('/DisplayAnAuction', {state: {userID: userID, auctionid: auction._id, highestBidValue: bidList[index], id: id}})}>View Auction</button>
        //                 </div>

        //         </div>
        //     </div>
        //     )
        //     }
        //     </div>
            
        // </div>


        <html>
        <head>
                <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            
        </head>
    
        <body>

        <div>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <div class="container-fluid">
                <ul class="navbar-nav">
                    <li class="nav-item mrg">
                        <a class="nav-link nav_button" onClick={() => navigate('/ViewMyBids', {state: {userID : userID, id: id}})}>My Bids</a>
                    </li>
                    <li class="nav-item mrg">
                        <a class="nav-link nav_button" onClick={() => navigate('/ContactUs', {state: {userID : userID, id: id}})}>Contact us</a>
                    </li>
                    <li class="nav-item mrg">
                        <a class="nav-link nav_button" onClick={() => navigate('/ViewMyAuctions', {state: {userID : userID, id: id}})}>My Auctions</a>
                    </li>
                    <li class="nav-item mrg">
                        <a class="nav-link nav_button" onClick={() => navigate('/PostAnAuction', {state: {userID : userID, id: id}})}> Post an auction</a>
                    </li>
                    <li class="nav-item mrg">
                        <a class="nav-link nav_button" onClick={() => navigate('/ViewMyInbox', {state: {userID : userID, id: id}})}>My inbox</a>
                    </li>
                    <li class="nav-item mrg">
                        <a class="nav-link nav_button" onClick={() => 
                                    {
                                        setUserID(0);
                                        navigate('/');
                                    }}> 
                                    Logout</a>
                    </li>
                </ul>
                <a class="nav-link nav_button" onClick={() => myNav()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg> 
                            Hello there  {username}!</a>

            </div>
        </nav>
            {/* <h3>Homepage</h3> */}
            {/* <div>
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
                                Hello there {username}!
                            </button>
                        </li>

                        
                    
                    </ul>

                </div>
            </div>  */}
            <br></br>
            <br></br>

            <div className='down-one'> 
            <div className='popular'>search for {location.state.searchString}</div>
            {
            auctions.map((auction, index) => 
            <div className=' serch_grid'>
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
                            <button className='btn btn-myauction' onClick={() => navigate('/DisplayAnAuction', {state: {userID: userID, auctionid: auction._id, maximumBid: bidList[index], id: id}})}>View Auction</button>
                        </div>

                </div>
            </div>
            )
            }
            </div>
            
        </div>
        </body>
</html>



    )
}