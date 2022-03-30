import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    
    display: flex;
    margin: 0;
    padding: 5px 10px;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  background: #ADEFD1FF;
  color: #00203FFF;

    
`
const Logo = styled.h1`
font-size: 40px;
 
display: flex;
 
align-items: center;
flex: 1;

`;
const Center = styled.div`
text-align: center;
    font-size: 30px;
    font-weight: 600;
    flex: 1;
`;
const Right = styled.div`
    display:  flex;
    flex: 1;
    justify-content: space-around;
`;
const MyLink = styled.div`
    font-size: 1.25rem;
    text-decoration: "none"; 
    transition: all ease 0.5s;
    padding:  2px 5px;
    &:hover{
    cursor: pointer;
    color: green;
    border: 0.5px dashed darkblue;
  }

  & > *{
    text-decoration: none !important;
     
  }
`;


function Navbar(props) {
    const { id } = useSelector((state) => state.currentUser);

    return (
        <Wrapper>
            <Logo> Mayo </Logo>
            <Center>Blog Web App </Center>
            <Right>
                <MyLink>
                    <NavLink  to="/home" >Home</NavLink>
                </MyLink>
                <MyLink>
                    <NavLink to={`/myPosts/${id}`}>My Posts</NavLink>
                </MyLink>
                <MyLink>
                    <NavLink to="/addPost"  >Add Post</NavLink>
                </MyLink>
                <MyLink>
                    <NavLink to={`/myAccount/${id}`}>  My Account</NavLink>
                </MyLink>
                <MyLink>
                    <NavLink to={'/login'} onClick={props.logOut} style={{color:"red",}}>  LogOut</NavLink>
                </MyLink>

            </Right>
        </Wrapper>
    )
}

export default Navbar;