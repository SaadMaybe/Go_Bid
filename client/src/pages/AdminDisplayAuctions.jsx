import React, { useState, Component, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";



export const AdminDisplayAuctions = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const [userID, setUserID] = useState(0);
    const [auctionInfo, setAuctionInfo] = useState([]);
    const [username, setUsername] = useState('');
    const [thanos, setThanos] = useState('');
    
    function deleteAuction(v)   
    {
        // console.log("Unlucky: " + v.target.value);
        // var unlucky = v.target.value;
        // console.log("unlucky is " + unlucky);
        var unlucky = thanos;
        axios.post('https://my-app-6zap7.ondigitalocean.app/deleteAuction', {auctionID: unlucky}).then(res =>
        {
            if(res.data.status !== 'ok')
            {
                alert("Auction: " + res.data.auctionName + " has been deleted");
                navigate("/AdminPortal", {state: {userID: userID}});
            }
            else
            {
                alert(res.message); 
                alert("There was an error in deleting the auction");
                navigate("/AdminPortal", {state: {userID: userID}});
            }
        });
    }

    useEffect(async () => {
        const hmm = location.state.userID;
        console.log("bruh")
        console.log("hmm is " + hmm);
        await setUserID(hmm);

        const h = location.state.username;
        await setUsername(h);


        const huh = location.state.info;
        console.log("huh is " + huh)
        await setAuctionInfo(huh);
    }, [location.state.userID, location.state.info]);

    

    return (
        // <div>
        //     <div className = "top-dash-user">
        //     <div className="back-btn"><button className="back" onClick={() => navigate('/AdminPortal', {state:{userID: location.state.userID}})}>&#8249;</button></div>
        //     Admin Portal
        //     </div>
        //     <div className="portal">
        //         <br></br>
        //         Admin Name: {username}
        //         <br></br>
        //         { (auctionInfo.length === 0) ? <h1>No auctions to display</h1> : <div>
        //         <h2>List of auctions:</h2>
        //         <ul>
        //             { 
        //             auctionInfo.map(auction =>  
        //                 <div className="playcards">
        //                     <li key={auction.auctionID}>
        //                         <div className="in-text">
        //                             Title: {auction.itemBeingAuctioned.itemTitle}
        //                             Maximum Bid: {auction.maxBid}

        //                             <p>   </p>
                                    
        //                             <button className="cancel" onClick={() => {setThanos(auction._id); deleteAuction()}}>Delete Auction</button>
        //                             <br></br>
        //                             <br></br>
        //                         </div>
        //                     </li>
        //                 </div>
        //             )}
        //         </ul>
        //         </div>
        //         }   
        //     </div>    
        // </div>
        <div>
        <div className = "top-dash-user">
        <div className="back-btn"><button className="back" onClick={() => navigate('/AdminPortal', {state:{userID: location.state.userID}})}>&#8249;</button></div>
        Admin Portal
        </div>
        <div className="portal">
            <br></br>
            Admin Name: {username}
            <br></br>
            { (auctionInfo.length === 0) ? <h1>No auctions to display</h1> : <div>
            <h2>List of auctions:</h2>
            <ul>
                { 
                auctionInfo.map(auction =>  
                    <div className="playcards">
                        <li key={auction.auctionID}>
                            <div className="in-text">
                                Title: {auction.itemBeingAuctioned.itemTitle}
                                Maximum Bid: {auction.maxBid}

                                <p>   </p>
                                
                                <button className="ban" onClick={() => {setThanos(auction._id); deleteAuction()}}>Delete Auction</button>
                                <br></br>
                                <br></br>
                            </div>
                        </li>
                    </div>
                )}
            </ul>
            </div>
            }   
        </div>    
    </div>
         
    )

    
    
}
