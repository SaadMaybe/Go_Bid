import React, { useState, Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import Signup from "./Signup"
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import { HStack, Image, Box, Spacer, Button, VStack, Heading, Container, Text } from '@chakra-ui/react';

export const SignIn = () => {
  
  const navigation = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("saad");
  const [Password, setPassword] = useState("");


  const changePhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumber)
  }

  const changePassword = (Password) => {
    setPassword(Password)
  }
  // const getPassword = (e) => {
  //   this.setState({
  //     Password: e.target.value
  //   })
  // }
  
  // onClickSignUp(e)
  // {
  //   console.log("Nav Function called")
  //   // this.navigate("./Signup");
  // }

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
  <Formik initialValues={{ phoneNumber: '', password: '' }} onSubmit={onSubmit}>
					{(props) => (
						<Form>
							<VStack spacing={8} width="30vw">
								<Field name="phoneNumber">
									{({ field, form }) => (
										<input type="text"
											label="Phone Number"
											id="phoneNumber"
											placeholder=""
											field={field}
											error={form.errors.phoneNumber}
											touched={form.touched.phoneNumber}
										/>
									)}
								</Field>
								<Field name="password">
									{({ field, form }) => (
										<input type = "password"
											label="Password"
											id="password"
											placeholder=""
											field={field}
											error={form.errors.password}
											touched={form.touched.password}
										/>
									)}
								</Field>

								<Button
									colorScheme="secondary"
									width="50%"
									size="lg"
									isLoading={props.isSubmitting}
									type="submit"
								>
									Log In
								</Button>
							</VStack>
						</Form>
					)}
				</Formik>
)
//   // render() {
//     // console.log(navigation)
//     return (
//             <div>
//             <h3>Sign in</h3>
//             <form onSubmit={()=>onSubmit()}>
//               <div className="form-group"> 
//                 <label>Number: </label>
//                 <input  type="text"
//                     required
//                     className="form-control"
//                     value={phoneNumber}
//                     // label = "inpNumber"
//                     // id = "inpNumber"
//                     onChange={()=>changePhoneNumber(phoneNumber)}
//                     />
//                 <br></br>
//                 <label>Password: </label>
//                 <input  type="password"
//                 required
//                 className="form-control"
//                 value={Password}
//                 // label = "inpPassword"
//                 // id = "inpPassword"
//                 onChange={()=>setPassword(Password)}
//                 />
//               </div>
//               <div className="form-group">
//                 <input type="submit" value="Sign In" className="btn btn-primary" />
//               </div>
//             </form>
//             <Link to= {"./signup"}> <button>Signup</button></Link>

//             </div>
//     )
//   // }
}
