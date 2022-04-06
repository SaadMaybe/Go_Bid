import React, { useState, Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  
  const navigation = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");


  const changePhoneNumber = (phoneNumber) => {
    console.log("MAAR DO MUJHE: ",phoneNumber.target.value)
    setPhoneNumber(phoneNumber.target.value)
  }

  const changePassword = (Password) => {
    console.log("MAAR DO MUJHE pt 2: ",Password.target.value)
    setPassword(Password.target.value)
  }

  const onSubmit = async () => {
    // preventDefault();
    const user = {
      phoneNumber: phoneNumber,
      password: Password
    }

    let s = await axios.post('http://localhost:9000/signin/', user).then();

    console.log("INSsadsadfIDE THE ONSUBMIT BUTTON")

    navigation.navigate("/Signup");

    if (s.data.status !== "error")
    {
      console.log("INSIDE THE ONSUBMIT BUTTON")
      // let navigate = useNavigate();
    }


    this.setState({
      Number: '',
      Password: ''
    })
  }

  return (
      <div>
      <h3>Sign in</h3>
      <form onSubmit={()=>onSubmit()}>
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

