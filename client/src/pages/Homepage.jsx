import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const Homepage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id
    const [searchQuery, setSearchQuery] = useState('')
    const [userID, setUserID] = useState(0);
    const [username, setUsername] = useState('');
    const [auctions, setAuctions] = useState([]);
    const [itemCategories, setItemCategories] = useState([]);
    const [bidList , setBidList] = useState([]);
    const [imageList , setImageList] = useState([]);
    

    function myNav()
    {
        navigate("/UserProfile", {state: {userID: userID, id: id}});
    }

    const changeSearchQuery = (description) => {
        setSearchQuery(description.target.value);
    }

    useEffect(async () => 
    {
        // if (location.state !== undefined &&)
        // {
            const hmmm = location.state.userID;
        
            setUserID(location.state.userID);
            
                await axios.post('https://my-app-6zap7.ondigitalocean.app/homepage/', {userID: hmmm, searchString: location.state.searchString}).then(res => 
                {
                    setUsername(res.data.username);
                    setImageList(res.data.imageList);
                    setAuctions(res.data.auctionList);
                    setItemCategories(res.data.itemCategories);
                    setBidList(res.data.bidList);

                }).catch(err => {return <div>{err}</div>});
    }, [location.state.userID])

    const onsubmitSearch = async (ev) =>{
        ev.preventDefault();

        const searchData = {
            searchString : searchQuery,
            userID: location.state.userID,
            id : location.state.id
        }
        

        let s = await axios.post('https://my-app-6zap7.ondigitalocean.app/homepage/search', searchData).then();

        if (s.data.status == "ok")
        {
            console.log("search ok")
            navigate("/SearchResults", {state: {userID: location.state.userID, id: id, searchString: searchQuery}});
        }
        else
        {
            console.log("ErrorMSG: ", s.data.message)
            navigate('/Homepage', {userID: userID, id: id})
        }
    }

    return (
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
            <div>back</div>
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
                        <a class="nav-link nav_button" onClick={() => navigate('/ViewMyInbox', {state: {userID : userID, id: id}})}> My Inbox</a>
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




            {/* <h3>Homepage</h3>
            <div className='big-black'>
                <div className='inner'>
                    <ul>
                        <li key={0}>
                            <button className='boss' onClick={() => 
                                {
                                    setUserID(0);
                                    navigate('/');
                                }}> 
                                Logout
                            </button>
                        </li>    
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
                            <button className='boss' onClick={() => navigate('/ContactUs', {state: {userID : userID, id: id}})}>Contact us</button> 
                        </li>
                        
                        
                        <li key={5}>
                            <button className='boss' onClick={() => myNav()}> 
                                Hello there  {username}!
                            </button>
                        </li>

                        
                    
                    </ul>
                </div>
            </div> */}
            <br></br>
            <div className='Search-Bar search_css'>
                <form className='fo-m' onSubmit={onsubmitSearch}>
                <label className='s_bid'>GoBid</label>
                <input  type="text"
                    required
                    className="form-control w-50 s_input" placeholder='Search'
                    // value={this.state.UserName}
                    onChange={changeSearchQuery}
                    />
                <button className='s_button' type='submit'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                                            </svg>
                </button>
                </form>
            </div>
                        
        <div className='down-one'> 
            <div className='popular'>Popular Items</div>
            {
            auctions.map((auction, index) => 
            <div className='row1 .col-md-2'>
                <div className='item'>
                <img src={imageList[index]}></img>
                        <div className='text-desc'>
                            {/* <h12> */}
                                <b>Title</b>:{auction.itemBeingAuctioned.itemTitle}
                            {/* </h12>  */}
                            <br></br>
                            {/* <h12> */}
                                <b>Location: </b>:{auction.itemBeingAuctioned.pictures[0]}
                            {/* </h12> */}
                            <br></br>
                            {/* <h12> */}
                                <b>Posted by</b>: {auction.auctioner.username}
                            {/* </h12> */}
                            <br></br>
                            {/* <h12> */}
                                <b>Highest Bid: {bidList[index]}</b>
                            {/* </h12> */}
                            <br></br>
                            <button className='btn btn-myauction' onClick={() => navigate('/DisplayAnAuction', {state: {userID: userID, auctionid: auction._id, maximumBid: bidList[index], id: id, highestBid: auction.highestBid, highestBidValue: auction.highestBidValue}})}>View Auction</button>
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