
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { publicRequst } from '../../Axios';
import { loginFailure, loginStart, loginSuccess } from '../../Redux/userRedux';
import img from "./../../imges/login.jpg"


const Wrapper = styled.div`
background-image: url(${img});
background-position: center;
background-size: cover;
height: 100vh;
/* width:100vw; */
display: flex;
`

const Left = styled.div`
/* background-color: #FFFFDf; */
display: flex;
justify-content: center;
align-items: center;
flex: 1;
color: white;
font-size: 40px;
text-transform: uppercase;
`
const APPTitle = styled.h1`
  letter-spacing: 10px;
  text-align: center;
`
const Right = styled.div`
/* background-color: #FFDFDD; */
display: flex;
flex: 1;
justify-content: center;
align-items: center;

`
const FormWrapper = styled.div`
width: 50%;
display: flex;
justify-content: center;
align-items: center;
 flex-direction: column;
 background: #FFF;
 padding: 20px;
`


const LoginForm = styled.form`
display: flex;
flex-direction: column;
min-width: 80%;

`

const Input = styled.input`
padding: 10px 5px;
/* border: none;                                                                                */
width: 100%;
margin: 10px auto;

`


const LoginButton = styled.button`
background: transparent;
width: 40%;
padding: 15px 20px;
border: none;
color:#A07855FF;
background-color:#D4B996FF ;
font-weight: bold;
font-size: 18px;
transition: all ease 0.5s ;


&:hover{
  cursor: pointer;
  color :#FFF;
}

&:disabled{
  cursor: not-allowed;
  
}


`
const CreateAccount = styled.span`
color: goldenrod;

&:hover{
  cursor: pointer;
}

`
const DecisionWraaper = styled.div`
min-width: 80%;
margin: 10px auto;
/* background: #FFDDFF; */
display: flex;
justify-content: space-between;
align-items: flex-end;
`
function Login() {
  console.log("in login");
  let history= useHistory();
  const [user, setUser] = useState({"email":"" , "password":""});
  const dispatch= useDispatch();

  const { error ,isFetching}= useSelector((state)=> state);
  
  function handleUser(e){
    const tempUser={...user};
    tempUser[e.target.name]=e.target.value;
    setUser(tempUser);
    console.log(user);
  }

  async function LoginFunction (e){
    e.preventDefault();
    dispatch(loginStart());
    console.log(isFetching);
    const BASE_URL='https://blog-user-posts-app3.herokuapp.com/signin';
    try {
      // await axios.post('https://blog-user-posts-app3.herokuapp.com/signin',user)
      const response= await publicRequst.post("/signin",user);
      const currentUser=response.data.data;
       localStorage.setItem('currentUser',JSON.stringify(response.data.data))
      dispatch(loginSuccess(currentUser));
      history.push("/home");
      console.log(currentUser);
      // dispatch(loginSuccess(user))
    } catch (err) {
      dispatch(loginFailure());
      console.log(err);
    }
    

    console.log(user);    
   
  }
  return (
    <Wrapper>
      <Left>
        <APPTitle> Blog App</APPTitle>
      </Left>
      <Right>
        <FormWrapper>
          <LoginForm>
            <Input onChange={handleUser}  type="text" name="email" placeholder='Email'></Input>
            <Input onChange={handleUser} type="password" name="password" placeholder='Password'></Input>
          </LoginForm>
          <DecisionWraaper>
            <LoginButton type='submit' onClick={LoginFunction}  disabled={isFetching} > {isFetching? <CircularProgress/>: "Login"}  </LoginButton>
            <CreateAccount><NavLink to="/register"> or Create Account :) </NavLink> </CreateAccount>
          </DecisionWraaper>
        </FormWrapper>
      </Right>
    </Wrapper>
  )
}

export default Login