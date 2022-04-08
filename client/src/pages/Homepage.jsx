import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export const Homepage = () => {

    const navigate = useNavigate();
    
    function myNav()
    {
        navigate("/UserProfile", {state: {phoneNumber: "777"}});
    }

    return (
        <div>
            Homepage
            <br></br>
            <button onClick={() => myNav()}> 
                yoyoyo
            </button>
        </div>
        

    )
}
