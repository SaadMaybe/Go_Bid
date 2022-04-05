import React, { useState, Component } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router";


export default class UserSignIn extends Component {
  constructor(props) {
    super(props);

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
            </div>
    )
  }
}

// export default function Signin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   Axios.defaults.withCredentials = true;
//   let history = useNavigate();

//   const login = () => {
//     Axios.post(`/signin`, {
//       username: username,
//       password: password,
//     }).then((response) => {
//       if (response.data.message) {
//         console.log(response.data.message);
//       } else {
//         history.push(`/Homepage`);
//       }
//     });
//     // history(`/Homepage`);

//   };
//   return (
//     <div className="App">
//       <div className="login">
//         <h1>Login </h1>
//         <input
//           type="text"
//           placeholder="Username..."
//           onChange={(e) => {
//             setUsername(e.target.value);
//           }}
//         />
//         <input
//           type="password"
//           placeholder="Password..."
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         />
//         <div>
//           <button onClick={login}> Login </button>
//           <button
//             onClick={() => {
//               history("/Signup");
//             }}
//           >
//             {" "}
//             Signup{" "}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
