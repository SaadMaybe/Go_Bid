import React, { useState, Component, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";

export const  UserProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [userID, setUserID] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    // let done = false;    

    useEffect(async () => {
        await setUserID(location.state.userID); 
        
        const huh = {
            userID: location.state.userID,
        }
        // console.log("Huh is", huh)
        axios.post('http://localhost:9000/userProfile/', huh).then(res => {
            
            // console.log("The urge to die can be rather uncontrollable at times");
            // console.log(res.data);
            setUsername(res.data.username);
            setEmail(res.data.email);   
            setPhoneNumber(res.data.phoneNumber);
            // console.log("HMMM " + res.data)
        }).catch(err => {return <div>{err}</div>});         
        // done = true;
    }, [location.state.userID])

    // if(!done) return <div>Loading...</div>


    return (
        
        <div className="user-outer">
            <div className = "top-dash-user">
            <div className="back-btn"><button className="back" onClick={() => navigate(-1, {state:{userID: location.state.userID}})}>&#8249;</button> </div>
            UserProfile
            </div>
            <div className="profile-bg">
                
            </div>
            <div className="profile-details">
                {/* <button onClick={() => navigate(-1, {state:{userID: location.state.userID}})}>Go back</button> */}
                <br></br><br></br>
                Hello {username}:<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

                <div className="user-details">
                    phoneNumber: {phoneNumber}<br></br>
                    email: {email}<br></br>
                </div>
                
            </div>
        </div>

    )

}

///hmm