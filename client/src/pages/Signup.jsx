import React, { useState, Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const changeUsername = (username) => {
    setUsername(username.target.value);
  }

  const changePhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumber.target.value);
  }

  const changeEmail = (email) => {
    setEmail(email.target.value);
  }

  const changePassword = (password) => {
    setPassword(password.target.value);
  }

  const onSubmit = async (ev) =>{
    ev.preventDefault();

    const user = {
      username: username,
      phoneNumber: phoneNumber,
      email: email,
      password: password
    }
  
    let s = await axios.post('http://localhost:9000/signup/', user);



  
    if (s.data.status !== "error")
    {
      console.log("INSIDE THE ONSUBMIT BUTTON")
      navigate("/signin");
  
    }
    // this.setState({
    //   username: '',
    //   phoneNumber: '',
    //   Email: '',
    //   password: ''
    // })
  
  }
  return (
                <div className="left">
                {/* <h3>Sign Up</h3> */}
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <h3>Sign Up</h3> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        // value={this.state.UserName}
                        onChange={changeUsername}
                        />
                    <br></br>
                    <label>PhoneNumber: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        // value={this.state.Number}
                        onChange={changePhoneNumber}
                        />
                    <br></br>
                    <label>Email: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        // value={this.state.Email}
                        onChange={changeEmail}
                        />
                    <br></br>
                    <label>Password: </label>
                    <input  type="password"
                    required
                    className="form-control"
                    // value={this.state.Password}
                    onChange={changePassword}
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







// export default class UserSignUp extends Component {
//   constructor(props) {
//     super(props);

//     this.getUserName = this.getUserName.bind(this);
//     this.getNumber = this.getNumber.bind(this);
//     this.getEmail = this.getEmail.bind(this);
//     this.getPassword = this.getPassword.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     this.state = {
//       UserName: '',
//       Number: '',
//       Email: '',
//       Password: ''
//     };
//   }

//   getUserName(e){
//     this.setState({
//       UserName: e.target.value
//     })
//   }

//   getNumber(e) {
//     this.setState({
//       Number: e.target.value
//     })
//   }

//   getEmail(e){
//     this.setState({
//       Email: e.target.value
//     })
//   }

//   getPassword(e) {
//     this.setState({
//       Password: e.target.value
//     })
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const user = {
//       UserName: this.state.UserName,
//       Number: this.state.Number,
//       Email: this.state.Email,
//       Password: this.state.Password
//     }

//     console.log("User: ", user);

//     axios.post('http://localhost:9000/signup/', user)
//       .then((res) => {
//         console.log(res.data)
//         alert("hello boss");
//         // let navigate = useNavigate();
//         // navigate('/')
//       },(rej) => {
//         alert("so sad")
        
//         this.setState({
//           UserName: '',
//           Number: '',
//           Email: '',
//           Password: ''
//         })
//         let navigate = useNavigate();
//         navigate('/')
//       });

    
//   }

//   render() {
//     return (
//             <div className="left">
//             {/* <h3>Sign Up</h3> */}
//             <form onSubmit={this.onSubmit}>
//               <div className="form-group">
//                 <h3>Sign Up</h3> 
//                 <label>Username: </label>
//                 <input  type="text"
//                     required
//                     className="form-control"
//                     value={this.state.UserName}
//                     onChange={this.getUserName}
//                     />
//                 <br></br>
//                 <label>Number: </label>
//                 <input  type="text"
//                     required
//                     className="form-control"
//                     value={this.state.Number}
//                     onChange={this.getNumber}
//                     />
//                 <br></br>
//                 <label>Email: </label>
//                 <input  type="text"
//                     required
//                     className="form-control"
//                     value={this.state.Email}
//                     onChange={this.getEmail}
//                     />
//                 <br></br>
//                 <label>Password: </label>
//                 <input  type="password"
//                 required
//                 className="form-control"
//                 value={this.state.Password}
//                 onChange={this.getPassword}
//                 />
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

