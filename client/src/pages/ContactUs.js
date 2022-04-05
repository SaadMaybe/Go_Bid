import React, { useState, Component } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router";

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    // this.getUserName = this.getUserName.bind(this);
    // this.getNumber = this.getNumber.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getSubject = this.getSubject.bind(this);
    this.getMsg = this.getMsg.bind(this);
    // this.getPassword = this.getPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Email: '',
      Subject: '',
      Msg: ''
    };
  }

  getEmail(e){
    this.setState({
      Email: e.target.value
    })
  }

  getSubject(e){
    this.setState({
      Subject: e.target.value
    })
  }

  getMsg(e) {
    this.setState({
      Msg: e.target.value
    })
  }



  onSubmit(e) {
    e.preventDefault();

    const concern = {
      // UserName: this.state.UserName,
      // Number: this.state.Number,
      // Email: this.state.Email,
      // Password: this.state.Password
      Email: this.state.Email,
      Subject: this.state.Subject,
      Msg: this.state.Msg
    }

    console.log("Concern: ", concern);

    axios.post('http://localhost:3000/contactUs/', concern)
      .then(res => console.log(res.data));

    this.setState({
      Email: '',
      Subject: '',
      Msg: ''
    })
  }

  render() {
    return (
            <div className="left">
            {/* <h3>Sign Up</h3> */}
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <h3>Sign Up</h3> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.UserName}
                    onChange={this.getUserName}
                    />
                <br></br>
                <label>Number: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.Number}
                    onChange={this.getNumber}
                    />
                <br></br>
                <label>Email: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.Email}
                    onChange={this.getEmail}
                    />
                <br></br>
                <label>Password: </label>
                <input  type="password"
                required
                className="form-control"
                value={this.state.Password}
                onChange={this.getPassword}
                />
                <input type="submit" value="Create User" className="btn btn-primary" />
                <div className="right"></div>
              </div>
              {/* <div className="form-group"> */}
                {/* <input type="submit" value="Create User" className="btn btn-primary" /> */}
              {/* </div> */}
            </form>
            </div>
    )
  }
}
