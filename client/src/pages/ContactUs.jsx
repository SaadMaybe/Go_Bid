// import React, { useState, Component } from "react";
// import axios from "axios";
// import "../App.css";
// import { useNavigate } from "react-router";

// export default class ContactUs extends Component {
//   constructor(props) {
//     super(props);
//     // this.getUserName = this.getUserName.bind(this);
//     // this.getNumber = this.getNumber.bind(this);
//     this.getEmail = this.getEmail.bind(this);
//     this.getSubject = this.getSubject.bind(this);
//     this.getMsg = this.getMsg.bind(this);
//     // this.getPassword = this.getPassword.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     this.state = {
//       Email: '',
//       Subject: '',
//       Msg: ''
//     };
//   }

//   getEmail(e){
//     this.setState({
//       Email: e.target.value
//     })
//   }

//   getSubject(e){
//     this.setState({
//       Subject: e.target.value
//     })
//   }

//   getMsg(e) {
//     this.setState({
//       Msg: e.target.value
//     })
//   }



//   onSubmit(e) {
//     e.preventDefault();

//     const concern = {
//       // UserName: this.state.UserName,
//       // Number: this.state.Number,
//       // Email: this.state.Email,
//       // Password: this.state.Password
//       Email: this.state.Email,
//       Subject: this.state.Subject,
//       Msg: this.state.Msg
//     }

//     console.log("Concern: ", concern);

//     axios.post('http://localhost:3000/contactUs/', concern)
//       .then(res => console.log(res.data));

//     this.setState({
//       Email: '',
//       Subject: '',
//       Msg: ''
//     })
//   }

//   render() {
//     return (
//             <div className="left"> 
//             {/* <h3>Sign Up</h3> */}
//             <form onSubmit={this.onSubmit}>
//               <div className="form-group">
//                 <h3>Sign Up</h3> 
//                 <label>Your Email Address: </label>
//                 <input  type="text"
//                     required
//                     className="form-control"
//                     value={this.state.Email}
//                     onChange={this.getEmail}
//                     />
//                 <br></br>
//                 <label>Subject: </label>
//                 <input  type="text"
//                     required
//                     className="form-control"
//                     value={this.state.Subject}
//                     onChange={this.getSubject}
//                     />
//                 <br></br>
//                 <label>How can we help you ? </label>
//                 <input  type="text"
//                     required
//                     className="form-control"
//                     value={this.state.Msg}
//                     onChange={this.getMsg}
//                     />
//                 <br></br>
//                 <input type="submit" value="Create User" className="btn btn-primary" />
//                 <div className="right"></div>
//               </div>
//               {/* <div className="form-group"> */}
//                 {/* <input type="submit" value="Create User" className="btn btn-primary" /> */}
//               {/* </div> */}
//             </form>
//             </div>
//     )
//   }
// }

import React, { useState, Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const contactUs = () => {
  const navigate = useNavigate();
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
  
    let s = await axios.post('http://localhost:9000/contactUs/', concern);



  
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
//   return (
//                 <div className="left">
//                 <form onSubmit={onSubmit}>
//                   <div className="form-group">
//                     <h3>Contact Us</h3> 
//                     <label>Email: </label>
//                     <input  type="text"
//                         required
//                         className="form-control"
//                         onChange={changeEmail}
//                         />
//                     <br></br>
//                     <label>Subject: </label>
//                     <input  type="password"
//                     required
//                     className="form-control"
//                     onChange={changeSubject}
//                     />
//                     <br></br>
//                     <label>How can we help you?: </label>
//                     <input  type="password"
//                     required
//                     className="form-control"
//                     onChange={changeMsg}
//                     />
//                     <input type="submit" value="Submit" className="btn btn-primary" />
//                     <div className="right"></div>
//                   </div>
//                 </form>
//                 </div>
//         )
// }
  return (
                
              <div className="pic-back-contact">
                <div className="contactContainer">
                <form onSubmit={onSubmit}>
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
                    {/* <div className="right"></div> */}
                  </div>
                </form>
                </div>
              </div>
        )
}




