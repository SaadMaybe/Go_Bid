import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

export const ViewMyBids = () => 
{

    const navigate = useNavigate();
    const location = useLocation();

    const [bidList, setBidList] = useState([]);
    const [username, setUsername] = useState("");
    const [id, setId] = useState('');
    const [itemList, setItemList] = useState([]);

    function timeDiff(d1, d2)
    {
        var date1 = new Date(d1);
        var date2 = new Date(d2);
        var diff = date1.getTime() - date2.getTime();
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);
        var hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);
        var minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60); 
        var seconds = Math.floor(diff / (1000));

        var returnString = "";
        if(days > 0)
            if(days == 1)
                returnString += days + " day ";
            else
                returnString += days + " days ";
        if(hours > 0)
            if(hours == 1)
                returnString += hours + " hour ";
            else
                returnString += hours + " hours ";
        if(minutes > 0)
            if(minutes == 1)
                returnString += minutes + " minute ";
            else
                returnString += minutes + " minutes "; 
        if(seconds > 0)
            if(seconds == 1)
                returnString += seconds + " seconds ";
            else
                returnString += seconds + " seconds ";
        return returnString;
    }
    

    function cancelBid(e)
    {
        const hmmm = e
        // console.log("Cancel Bid");
        axios.post("https://my-app-6zap7.ondigitalocean.app/viewMyBids/cancel", {bidID: e}).then(async res =>
        {
            // console.log("res is " + res.data);
            if(res.data.status === 'ok')
                alert("Bid cancelled!")
            else
                alert("Bid not cancelled!")
            await setBidList([]);
            await setUsername("");
            navigate("/Homepage", {state: {userID: location.state.userID, id: id}});
            
        })
        //Cancels an auction
    }

    useEffect(async () => 
    {
        const hmmm = location.state.userID;
        await setId(location.state.id);
        // // console.log("hmmm is " + hmmm);
        await axios.post('https://my-app-6zap7.ondigitalocean.app/viewMyBids', {userID: hmmm}).then(async response => 
        {
            // console.log("Please just kill me");
            // console.log("the response is " + response.data.status);
            if(response.data.status == 'ok')
            {
                // console.log("I beg of you, end this life of mine. Put me out of my misery");
                
                await setUsername(response.data.username);
                // console.log("The username is " + response.data.username);
                
                await setBidList(response.data.bidList);
                // console.log("The freaking bloody bidlist is " + response.data.bidList[0]);

                await setItemList(response.data.itemList);
                // console.log("Item list is " + itemList);
            }
            else
            {
                // console.log("Bhar main jaye ye project");
                navigate("/Homepage", {state: {userID: location.state.userID, id: id}});
                return "error";
                
            }
                        
        });
    }, [location.state.userID]);

    return (
        <div>
            <div className = "top-dash-user">
            <div className="back-btn"><button className="back" onClick={() => navigate('/Homepage', {state:{userID: location.state.userID, id: id}})}>&#8249;</button> </div>
            My Bids
            </div>
            <br></br>
            <div className='past-btn'>
                <button className='past-auction' onClick={() => navigate('/ViewMyPastBids', {state:{userID: location.state.userID, id: id}})}>Past Bids</button>
            </div>
            {
                itemList == [] ? <div>Please wait</div> : 
                <div>
                    List of bids for user {username}:
                    <br></br><br></br><br></br><br></br>
                        <ul>
                            { 
                            bidList.map((bid, index) =>    
                                <div className='playcards'>
                                    <li key={bid.bidID}>
                                        <div className='in-text'>
                                            Title of the auction: {itemList[index]}
                                            <p>   </p>
                                            My Bid on this auction: {bid.amountBidded}
                                            <p>   </p>
                                            Time remaining: {timeDiff(bid.associatedAuction.endingTime, new Date())}
                                            <button className='cancel' onClick={() => {cancelBid(bid.bidID);}}>Cancel</button> 
                                        </div>

                                    </li>
                                </div>
                            )}
                        </ul>
                </div>
            }
        </div>
    )
}