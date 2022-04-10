import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';

export const Homepage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const userID = location.state.userID;

    function myNav()
    {
        navigate("/UserProfile", {state: {userID: userID}});
    }

    const id = location.state.id;

    console.log(id);

    useEffect(() => 
    {
        // if (location.state !== undefined &&)
        // {
            const hmmm = location.state.userID;
            console.log("hmmm is " + hmmm);
            setUserID(location.state.userID);
            console.log("User ID is " + userID);

            // if(userID !== 0)
            // {
                axios.post('http://localhost:9000/homepage/', {userID: hmmm}).then(res => 
                {
                    setUsername(res.data.username);
                    setAuctions(res.data.auctions);
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
        
            <div>
                Homepage
                
                <br></br>
                <button onClick={() => myNav()}> 
                    Hello there  {username}!
                </button>
            

                <button onClick={() => navigate('/ContactUs')}>Contact us</button>                
                
                <button onClick={() => navigate('/PostAnAuction', {state: {id : id}})}> 
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
