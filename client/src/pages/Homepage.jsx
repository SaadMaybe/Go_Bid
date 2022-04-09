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

    function postAnAuction()
    {
        navigate("/Postanauction", {state: {userID: userID}});
    }

    return (
        <div>
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
        </div>
        

    )
}
