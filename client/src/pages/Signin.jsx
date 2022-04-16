import React, { useState, Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");


  const changePhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumber.target.value)
  }

  const changePassword = (Val) => {
    setPassword(Val.target.value)
  }


  const onSubmit = async (ev) => {
    ev.preventDefault();

    const user = {
      phoneNumber: phoneNumber,
      Password: Password
    }

    let s = await axios.post('http://localhost:9000/signin/', user).then();
    //console.log(s.data.id);
    //console.log(s.data.userID);

    
    if (s.data.status !== "error")
    {
      console.log("In signin Route id: ", s.data.id)
      navigate("/Homepage", { state: {userID: s.data.userID, id: s.data.id}});
    }
    else
    {
      alert("stupid")
      // setPhoneNumber("");
      // setPassword("");
    }

    


  }

  return (
      <div>
        <div className = "top-dash-user">
        <div className="gobid">GoBid</div>
        LOGIN
        </div>
        <div className = "left">
        {/* <h3>Sign in</h3> */}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <h3>Sign in</h3> 
            <label>Number: </label>
            <input  type="text"
                required
                className="form-control"
                // value={phoneNumber}
                // label = "inpNumber"
                // id = "inpNumber"
                onChange={changePhoneNumber}
                />
            <br></br>
            <label>Password: </label>
            <input  type="password"
            required
            className="form-control"
            // value={Password}
            // label = "inpPassword"
            // id = "inpPassword"
            onChange={changePassword}
            />
            <input type="submit" value="Sign In" className="btn btn-primary" />
            <div><Link to= {"./signup"}> <button className="signup-link">SIGNUP</button></Link></div>
            
            <div className="right"></div>
          </div>
          
        </form>
        {/* <Link to= {"./Signup"}> */}
          {/* <button onClick={() => navigate("/Signup")}>Signup</button> */}
        {/* </Link> */}
        </div>
      </div>
    )
}