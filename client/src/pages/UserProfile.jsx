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
    const [accountStatus, setAccountStatus] = useState('')
    const [email, setEmail] = useState('');
    const [id, setId] = useState("");
    const [completedAuctions, setCompletedAuctions] = useState(0);
    const [cancelledAuctions, setCancelledAuctions] = useState(0);
    // let done = false;    

    useEffect(() => {
        
        setUserID(location.state.userID);
        setId(location.state.id);
        
        const huh = {
            userID: location.state.userID,
        }
        console.log("Huh is", huh)
        axios.post('https://my-app-6zap7.ondigitalocean.app/userProfile/', huh).then(async res => {
            
            console.log("The urge to die can be rather uncontrollable at times");
            console.log(res.data);
            setUsername(res.data.username);
            setEmail(res.data.email);   
            setPhoneNumber(res.data.phoneNumber);
            setAccountStatus(res.data.account_status);
            console.log("HMMM " + res.data);

            const arr = res.data.completedAuctions;
            let i = 0;
            for(; i < arr.length; i++);
            setCompletedAuctions(i);

            setCancelledAuctions(res.data.cancelledAuctions);

        }).catch(err => {return <div>{err}</div>});         
        // done = true;
    }, [location.state.userID])

    // if(!done) return <div>Loading...</div>


    return (
        
        
        // <div className="user-outer">
        // <div className = "top-dash-user">
        // <div className="back-btn"><button className="back" onClick={() => navigate(-1, {state:{userID: location.state.userID, id: id}})}>&#8249;</button> </div>
        // UserProfile
        // </div>
        // <div className="profile-bg">
        // </div>
        // <div className="profile-details">
        //     {/* <button onClick={() => navigate(-1, {state:{userID: location.state.userID}})}>Go back</button> */}
        //     <br></br><br></br>
        //     Hello {username}:<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        
        //     <div className="user-details">
        //         phoneNumber: {phoneNumber}<br></br>
        //         email: {email}<br></br><br></br>
        //         {(accountStatus==="admin") ? <button className="btn btn-primary" onClick={() => navigate('/AdminPortal', {state:{userID: location.state.userID, id: id}})}>Admin Portal</button> : null}    
        //     </div>
        // </div>
        // </div>

        <div className="user-outer">
        <div className = "top-dash-user">
        <div className="back-btn"><button className="back" onClick={() => navigate(-1, {state:{userID: location.state.userID}})}>&#8249;</button> </div>
        UserProfile
        </div>

        <div className="profile-bg">
            
        </div>
        <div className="to-portal">{(accountStatus==="admin") ? <button className="past-auction" onClick={() => navigate('/AdminPortal', {state:{userID: location.state.userID}})}>Admin Portal</button> : null}</div>
        <div className="profile-details">
            {/* <button onClick={() => navigate(-1, {state:{userID: location.state.userID}})}>Go back</button> */}
            <br></br><br></br>
            Hello {username}:<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        
            <div className="user-details">
                phoneNumber: {phoneNumber}<br></br>
                email: {email}<br></br>
                Completed Auctions: {completedAuctions}<br></br>
                Cancelled Auctions: {cancelledAuctions}<br></br><br></br>
            </div>
            {/* <div className="hojana">{(accountStatus==="admin") ? <button className="btn btn-primary" onClick={() => navigate('/AdminPortal', {state:{userID: location.state.userID}})}>Admin Portal</button> : null}</div>     */}
        </div>
        </div>
    )

}

     

