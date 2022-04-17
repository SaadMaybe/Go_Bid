import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

export const ViewMyPastBids = () => 
{

    const navigate = useNavigate();
    const location = useLocation();

    const [bidList, setBidList] = useState([]);
    const [username, setUsername] = useState("");
    const [id, setId] = useState('');
    const [itemList, setItemList] = useState([]);



 

    
    useEffect(async () => 
    {
        const hmmm = location.state.userID;
        await setId(location.state.id);
        // // console.log("hmmm is " + hmmm);
        axios.post('https://my-app-6zap7.ondigitalocean.app/viewMyBids/past', {userID: hmmm}).then(async response => 
        {
            // console.log("Please just kill me");
            // console.log("the response is " + response.data.status);
            if(response.data.status == 'ok')
            {
                
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
            My Past Bids
            </div>
            <br></br>
            <div className='past-btn'>
                <button className='past-auction' onClick={() => navigate('/ViewMyBids', {state:{userID: location.state.userID, id: id}})}>Past Bids</button>
            </div>

            
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
                                </div>

                            </li>
                        </div>
                    )}
                </ul>
            <div>
            </div>
        </div>
    )
}
