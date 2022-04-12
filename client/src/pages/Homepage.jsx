import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';


export const Homepage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const userID = location.state.userID;
    const id = location.state._id;

    function myNav()
    {
        navigate("/UserProfile", {state: {userID: userID}});
    }

<<<<<<< Updated upstream
    function postAnAuction()
=======
    const id = location.state.id;

    console.log("id:L27 ",id);

    useEffect(() => 
>>>>>>> Stashed changes
    {
        navigate("/Postanauction", {state: {userID: userID}});
    }

    return (
        <div>
<<<<<<< Updated upstream
            Homepage
            <br></br>
            <button onClick={() => myNav()}> 
                yoyoyo
            </button>

            <button onClick={() => postAnAuction()}> 
                Post an auction
            </button>

            <Link to= {"../ContactUs"}> <button>Contact us</button></Link>
            <p>The user's phone number is {userID}</p>
=======
        
            <div>
                Homepage
                
                <br></br>
                <button onClick={() => myNav()}> 
                    Hello there  {username}!
                </button>
            

                <button onClick={() => navigate('/ContactUs')}>Contact us</button>                
                
                <button onClick={() => navigate('/PostAnAuction', {state: {id : id, userID: userID}})}> 
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
          
            
>>>>>>> Stashed changes
        </div>
        

    )
}
