import React, { useState, Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export const SignIn = () => {
  
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");


  const changePhoneNumber = (XVal) => {
    setPhoneNumber(XVal.target.value)
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

    console.log("Status: ", s.data.status)
    if (s.data.status !== "error")
    {
      let str = s.data.userID.toString()
      
      console.log("routing to homepage ", str)

      console.log("Homepage/" + str)
      navigate("/Homepage/" + str);
    }
    else
    {
      console.log("In else statement")
    }


    setPhoneNumber("")
    setPassword("")
  }

  return (

      <div>
      <h3>Sign in</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
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
        </div>
        <div className="form-group">
          <input type="submit" value="Sign In" className="btn btn-primary" />
        </div>
      </form>
      <Link to= {"./signup"}> <button>Signup</button></Link>
      </div>
    )
}