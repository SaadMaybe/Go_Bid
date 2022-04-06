import React, { useState, Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import Signup from "./Signup"
import { useNavigate } from "react-router-dom";


export default class UserSignIn extends Component {
  constructor(props) {
    super(props);
    // this.navigate = this.navigate.bind(this)
    this.getNumber = this.getNumber.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Number: '',
      Password: ''
    };
  }

  getNumber(e) {
    this.setState({
      Number: e.target.value
    })
  }

  getPassword(e) {
    this.setState({
      Password: e.target.value
    })
  }
  
  onClickSignUp(e)
  {
    console.log("Nav Function called")
    // this.navigate("./Signup");
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      Number: this.state.Number,
      Password: this.state.Password
    }

    console.log("User: k ",user);

    axios.post('http://localhost:9000/signin/', user)
      .then(res => console.log("resData ",res.data));

    this.setState({
      Number: '',
      Password: ''
    })
  }

    


  render() {
    return (
            <div>
            <h3>Sign in</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Number: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.Number}
                    onChange={this.getNumber}
                    />
                <br></br>
                <label>Password: </label>
                <input  type="password"
                required
                className="form-control"
                value={this.state.Password}
                onChange={this.getPassword}
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
}
