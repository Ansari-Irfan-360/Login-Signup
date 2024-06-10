import React, { useState, useEffect, useContext } from "react";
import { TextField, Box, Button, Typography, styled } from "@mui/material";
import imageURL from '../images/Logo.png'

import { API } from "../service/api";
import { DataContext } from "../context/DataProvider";

import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  ${"" /* background: black; */}
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #9d4ccc;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const loginInitialValues = {
  username: "",
  password:""
};

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const Login = ({isUserAuthenticated}) => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, showError] = useState("");

  const {setAccount} = useContext(DataContext)
  const navigate = useNavigate();

  function toggleSignup() {
    account === "login" ? toggleAccount("signup") : toggleAccount("login");
  }

  function onInputChange(e) {
    setSignup({...signup, [e.target.name]: e.target.value});
  }

  const signupUser = async () => {
    let successfull = false;
    try {
      let response = await API.userSignup(signup);
      console.log(response);
      successfull = response.isSuccess ? true : false;
    } catch (error) {
      console.log(error);
    }

    if (successfull) {
      showError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  const onValueChange = (e) => {
    setLogin({...login, [e.target.name]: e.target.value})
  }

  const loginUser = async () => {
    let successfull = false;
    let response;
    try {
      response = await API.userLogin(login);
      console.log(response);
      successfull = response.isSuccess ? true : false;
    } catch (error) {
      console.log(error);
    }

    if (successfull) {
      showError("");
      
      sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`)
      sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`)

      setAccount({username: response.data.username, name: response.data.name});

      isUserAuthenticated(true);

      navigate('/');

    } else {
      showError("Something went wrong! please try again later");
    }
    
  }
  var name;
  return (
    <Component>
      <Box>
        <Image
          src={imageURL}
          alt="blog"
          style={{ height: "9em", width: "9em" }}
        />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              name="username"
              label="Enter Username"
              onChange={(e)=>{onValueChange(e)}}
            />
            <TextField
              variant="standard"
              name="password"
              label="Enter Password"
              onChange={(e)=>{onValueChange(e)}}
            />
            {error && <Error>{error}</Error>}
            <LoginButton onClick={()=>{loginUser()}} variant="contained">Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton
              onClick={() => {
                toggleSignup();
              }}
            >
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              name="name"
              onChange={(e) => onInputChange(e)}
              label="Enter Name"
            />
            <TextField
              variant="standard"
              name="username"
              onChange={(e) => onInputChange(e)}
              label="Enter Username"
            />
            <TextField
              variant="standard"
              name="password"
              onChange={(e) => onInputChange(e)}
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}
            <SignupButton
              onClick={() => {
                signupUser();
              }}
            >
              Signup
            </SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
