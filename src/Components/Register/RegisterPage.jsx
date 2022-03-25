import axios from 'axios';
import React, { useState } from 'react'

import styled from "styled-components";

import img from "./../../imges/login.jpg"
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { publicRequst } from '../../Axios';

const Container = styled.div`
  /* width: 100vw; */
  height: 100vh;
  background-image: url(${img});
background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Right = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 80%;
  padding: 20px;
  background-color: white;
  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;

  /* &:hover{
   
    cursor: not-allowed ;
  } */
`;

const RESULT = styled.div`
  background: ${props => props.color} ;
  color:  ${props => props.type == "success" ? "white" : "black"} ;
  text-align: center;
  letter-spacing: 3px;
  padding: 5px;
  margin-top: 5px;
  margin: 10px;
  /* display: none; */
`

const Bold = styled.span`
font-weight: 600;
`
const Register = () => {
  const [user, setUser] = useState({
    "name": "",
    "email": "",
    "password": "",
    "cPassword": "",
    "phone": "",
    "location": ""
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  function handleUser(e) {
    const tempUser = { ...user };
    tempUser[e.target.name] = e.target.value;
    setUser(tempUser);
    console.log(user);
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    setisLoading(true);
    // console.log(user);
    // const BASE_URL = 'https://blog-user-posts-app3.herokuapp.com/signup';
    try {
      let data = await publicRequst.post("signup", user);
      console.log(data);
      let response = data.data;
      console.log("00" + response.Result);
      console.log("hello", response);
      setSuccess(true);
      setisLoading(false);
      setError(false);
    } catch (error) {
      console.log("hello2", error);
      setSuccess(false);
      setisLoading(false);
      setError(true);
      // document.getElementsByTagName('loading').style.display="block";
    }
    // document.getElementsByTagName('loading').style.display="none";

  }






  return (
    <Container>
      <Left>

      </Left>
      <Right>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input onChange={handleUser} name="name" placeholder="Name" />
            <Input onChange={handleUser} name="email" placeholder="Email" />
            <Input onChange={handleUser} name="phone" placeholder="Phone" />
            <Input onChange={handleUser} name="location" placeholder="Location" />
            <Input onChange={handleUser} name="password" type="password" placeholder="Password" />
            <Input onChange={handleUser} name="cPassword" type="password" placeholder="Confirm password" />
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleRegister} >{isLoading ? <CircularProgress color='#FFF' /> : "CREATE"}</Button>
          </Form>

          {success && <RESULT id='success' type="success" color="green" > Registered <Bold>Successfully</Bold>. Verify your Email to Login now. </RESULT>}
          {error && <RESULT id='failure' type="failure" color="red"> Registered <Bold>Failed</Bold>. Error </RESULT>}


          {/* {isLoading && <RESULT id='loading' type="loading" color="white">  
          <LinearProgress  style={{margin:"10px 0px" , padding:"5px"}}/>
          <LinearProgress color="secondary" style={{margin:"10px 0px" , padding:"5px"}}/>
        </RESULT>
} */}
        </Wrapper>
      </Right>
    </Container>
  );
};

export default Register