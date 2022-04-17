import React, { useState, Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export const ContactUs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");


  const changeEmail = (email) => {
    setEmail(email.target.value);
  }

  const changeSubject = (subject) => {
    setSubject(subject.target.value);
  }

  const changeMsg = (msg) => {
    setMsg(msg.target.value);
  }

  const onSubmit = async (ev) =>{
    ev.preventDefault();

    const concern = {
      email: email,
      subject: subject,
      msg: msg
    }
  
    let s = await axios.post('https://my-app-6zap7.ondigitalocean.app/contactUs/', concern);



  
    if (s.data.status !== "error")
    {
      console.log("concern entered")
      navigate("/Homepage");
  
    }
    else{
      setEmail("");
      setSubject("");
      setMsg("");
    }
  
  }

  return (
    // <div>
    // 	<div className = "top-dash-user">
    // 		<div className="back-btn">
		// 	<button 
		// 	className="back" 
		// 	onClick=
		// 		{
		// 			() => {navigate('/Homepage', {state:{userID: location.state.userID, id: location.state.id}})}
		// 		}>&#8249;</button>
		// 	</div>
		// 	Contact Us
		// 	</div>
      
		// 	Feel free to contact us at GoBid@gmail.com		
    //   </div>
    <div className="user-outer">
    <div className = "top-dash-user">
    <div className="back-btn"><button className="back" onClick={() => navigate(-1, {state:{userID: location.state.userID}})}>&#8249;</button> </div>
    Contact Us
    </div>

    <div className="profile-bg">
        
    </div>

    <div className="profile-details">
        {/* <button onClick={() => navigate(-1, {state:{userID: location.state.userID}})}>Go back</button> */}
        <br></br><br></br>
    
        <div className="user-details">
            Email: gobid@hotmail.com
            <br></br><br></br>
            Phone No.: 090078601
           
        </div>
        {/* <div className="hojana">{(accountStatus==="admin") ? <button className="btn btn-primary" onClick={() => navigate('/AdminPortal', {state:{userID: location.state.userID}})}>Admin Portal</button> : null}</div>     */}
    </div>
    </div>
		
        )

}



{/* <form onSubmit={onSubmit}>
                  <div className="form-group-contact">
                    <h3>Contact Us</h3> 
                    <label>Email: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        onChange={changeEmail}
                        />
                    <br></br>
                    <label>Subject: </label>
                    <input  type="password"
                    required
                    className="form-control"
                    onChange={changeSubject}
                    />
                    <br></br>
                    <label>How can we help you?: </label>
                    <input  type="password"
                    required
                    className="form-control"
                    onChange={changeMsg}
                    />
                    <input type="submit" value="Submit" className="btn btn-primary" />
                    {/* <div className="right"></div> *
                  </div>
                </form> */}
