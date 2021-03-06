// import React , {useState} from "react";
// import Axios from "axios";
// import "../App.css";
// import { useNavigate } from "react-router";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// export default function Signup() {
//   let history = useNavigate();
//   const [status, setStatus] = useState(false);
//   const [check, setcheck] = useState(true);


//   Axios.defaults.withCredentials = true;

//   const initialValues = {
//     username: "",
//     // phone: "",
//     // name: "",
//     password: "",
//   };

//   const validationSchema = Yup.object().shape({
//     username: Yup.string().min(3).max(15).required(),
//     password: Yup.string().min(4).max(20).required(),
//     // phone: Yup.string().required(),
//     // name: Yup.string().required(),
//   });

//   const onSubmit = (data) => {
//     Axios.post("/signup", data).then((response) => {
//       console.log(data);
//       if(response.data==="FALSE"){
//         setcheck(false)
//       }
//       else if(response.data){
//         setcheck(true);
//         setStatus(false);
//         history("/");
//       }
//       else{
//         setStatus(true);
//       }
//     });
//   };

//   return (
//     <div className="App">
//       <div className="register">
//         <h1>Signup</h1>
//         <Formik
//           initialValues={initialValues}
//           onSubmit={onSubmit}
//           validationSchema={validationSchema}
//         >
//           <Form className="formContainer">
//             <Field
//               autoComplete="off"
//               id="inputCreatePost"
//               name="username"
//               placeholder="Username"
//             />

//             {/* <Field
//               autoComplete="off"
//               type="text"
//               id="inputCreatePost"
//               name="name"
//               placeholder="Name"
//             />

//             <Field
//               autoComplete="off"
//               type="text"
//               id="inputCreatePost"
//               name="phone"
//               placeholder="Contact Number"
//             /> */}

//             <Field
//               autoComplete="off"
//               type="password"
//               id="inputCreatePost"
//               name="password"
//               placeholder="Password"
//             />

//             <button type="submit"> Signup</button>
//           {!check ? <div> username already exists</div> : <div></div>}


//             <br></br>

//             <ErrorMessage name="password" component="span" />
//             {status === true && (
//               <label className="exist">Username Already exist</label>
//             )}
//             <br></br>
//             <ErrorMessage name="username" component="span" />
//             <br></br>
//             <ErrorMessage name="name" component="span" />
//             <br></br>
//             <ErrorMessage name="phone" component="span" />
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// }


// //hmm

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
  
    let s = await axios.post('https://my-app-6zap7.ondigitalocean.app/signup/', user);



  
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
                    <button onClick={() => navigate("/")} className="signin-btn">Sign In</button>

                    <div className="right"></div>
                    <button className="signin-btn" onClick={() => navigate("/")}>Sign In</button>
                  </div>
                  {/* <button onClick={() => navigate("/")}>Sign In</button> */}
                </form>
                </div>
        )
}



