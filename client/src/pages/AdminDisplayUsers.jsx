import React, { useState, Component, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";


export const AdminDisplayUsers = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const [userID, setUserID] = useState(0);
    const [username, setUsername] = useState('');
    const [userInfo, setUserInfo] = useState([]);
    const [un, setUn] = useState(0);
    
    function BanUser(e)
    {
        var unlucky = un;
        axios.post('https://my-app-6zap7.ondigitalocean.app/banUser', {userID: unlucky}).then(res =>
        {
            if(res.status === 200)
            {
                alert("User: " + res.data.username + " has been banned");
                navigate("/AdminPortal", {state: {userID: userID}});
            }
            else
            {
                alert("There was an error in banning the user");
                navigate("/AdminPortal", {state: {userID: userID}});
            }
        });
    }

    useEffect(async () => {
        const hmm = location.state.userID;
        
        await setUserID(hmm);

        const h = location.state.username;
        await setUsername(h);

        const huh = location.state.info;
        
        await setUserInfo(huh);
        
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
        //         <br></br>
        //         List of users:
        //         <ul>
        //             { 
        //             userInfo.map(user =>
        //                 <div className="playcards">
        //                     <li key={user.userID}>
        //                         <div className="in-text">
        //                             User: {user.username}<br></br>
        //                             Phone Number: {user.phoneNumber}<br></br>
        //                             Email: {user.email}
        //                             <p>   </p>
                                    
        //                             <button className="cancel" onClick={() => {setUn(user.userID);BanUser()}}>Ban User</button>
        //                             <br></br>
        //                             <br></br>
        //                         </div>
        //                     </li>
        //                 </div>
        //             )}
        //         </ul>
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
                <br></br>
                List of users:
                <ul>
                    { 
                    userInfo.map(user =>
                        <div className="playcards">
                            <li key={user.userID}>
                                <div className="in-text">
                                    User: {user.username}<br></br><br></br>
                                    Phone Number: {user.phoneNumber}<br></br><br></br>
                                    Email: {user.email}
                                    <p>   </p>
                                    
                                    <button className="ban" onClick={() => BanUser(user._id)}>Ban User</button>
                                    <br></br>
                                    <br></br>
                                </div>
                            </li>
                        </div>
                    )}
                </ul>
            </div>
        </div>
        
    )

    
}
