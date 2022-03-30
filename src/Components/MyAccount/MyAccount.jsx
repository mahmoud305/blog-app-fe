import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import styled from 'styled-components'
import { privateRequst } from '../../Axios'
import { CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
const Container = styled.div`
    min-height: 50vh;
    background: #89ABE3FF;
    overflow: hidden;
`

const Wrapper = styled.div`
        width: 90%;
        margin: 0 auto;
        max-width: 1200px;
        background: #FCF6F5FF;
        min-height: inherit;
        margin: 30px auto;
        padding: 10px 0px;
        justify-content: center;
        display:flex;
`

const ImgWrapper = styled.div`
  background: darkgray;
  margin: 5px 10px;
  flex:1;
  & >*{
    height: 100%;
    background-color: #FFF;
    border-radius: 50%;
  }
`
const RightWrapper = styled.div`
  /* background: yellow; */
  align-items: center;
  margin: auto;
  flex:3;
`




const UserInfo = styled.div`
/* display: flex; */
/* height: 30vh; */
padding: 10px 20px;
/* flex-wrap: wrap; */
 justify-content: center; // for the display flex when there is no user.
 align-items: center;
  background: green;
`
const Column = styled.div`
display: flex;
/* display: none; */
/* align-items: center; */
background-color: aqua;
margin: 10px ;
flex-direction: column;
flex: 1;
justify-content: space-between;
& > p  {
  font-size: 1.25rem;
  margin-bottom: 10px;
  /* background-color: black; */
  font-weight: bold;
}
`

const Button = styled.button`
margin: 10px auto;
border: none;
border-radius: 5px;
font-size: 1.25rem;
    padding: 10px 20px;
    font-weight: Bold;
    background:  #dddd00  ;
    color:#FCF6F5FF;
    transition: all ease 0.5s;
    &:hover{
        cursor: pointer;
        color: #000;
        background:  #FFFF00 ;
    }    
`


const UpdateForm = styled.form`
display: none;

`

const Input = styled.input`
padding: 10px 5px;
/* border: none;  */
width: 90%;
margin: 10px auto;

`
const Label = styled.label`
  margin-bottom: 5px;
`

const DecisionWraaper = styled.div`
min-width: 80%;
margin: 10px auto;
/* background: #FFDDFF; */
display: flex;
justify-content: space-between;
align-items: flex-end;
`
function MyAccount() {
  const { id } = useParams();
  const [updatForm, setupdatForm] = useState(false);
  const [user, setUser] = useState({ "name":"" , "email":"", "phone":"", "location":"", "createdAt":"" });
  const [isFetching, setIsFetching] = useState(false);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  function handleUser(e) {
    const tempUser = { ...user };
    tempUser[e.target.name] = e.target.value;
    setUser(tempUser);
  }
  useEffect(async () => {
    const { data } = await privateRequst(`/getUserById/${id}`);
    const { name, email, phone, location, createdAt } = data.data;

    setUser({ name, email, phone, location, createdAt });
    console.log(user);
    //  console.log(data.data);
    // console.log("any");

  }, []);

  async function updateProfieHelper() {
    try {
      const { createdAt, email, ...tempUser } = user;
      console.log(tempUser);
      const { data } = await privateRequst.put(`/updateUser/${id}`, tempUser);
      console.log(data);

    } catch (error) {
      console.log("error in updating the user");
    }
  }

  function updateProfie(e) {
    e.preventDefault();
    try {
      setIsFetching(true);
      updateProfieHelper();
      setIsFetching(false);
      setupdatForm(false);
     setIsUserUpdated(true);
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      console.log("should close");
        return;
    }

    setIsUserUpdated(false);
};
  return (
    <Container>
      <Wrapper>

        <ImgWrapper>
          <div></div>
        </ImgWrapper>
        <RightWrapper>
          <UserInfo className="userInfo"  >
            <CircularProgress style={{  display: user.name ? "none" : "block" }} />
            <Column style={{ display: updatForm || !user.name ? "none" : "block" }} >
              {/* */}
              <Label htmlFor="name">Name:</Label>
              <p>     {user.name} </p>
              <Label htmlFor="email">E-mail:</Label>
              <p>     {user.email} </p>
              <Label htmlFor="phone">Phone:</Label>
              <p>     {user.phone} </p>
              <Label htmlFor="location">Location:</Label>
              <p>        {user.location}  </p>

            </Column >
            {/* / */}
            <UpdateForm style={{ display: updatForm ? "block" : "none" }} >

              <Input placeholder='NAME' name='name' onChange={handleUser} value={user.name}></Input>

              <Input placeholder='E-mail' name='email' onChange={handleUser} value={user.email} readOnly ></Input>

              <Input placeholder='Phone' name='phone' onChange={handleUser} value={user.phone}></Input>

              <Input placeholder='Location' name='location' onChange={handleUser} value={user.location}></Input>
              <DecisionWraaper>
                <Button type='submit' onClick={updateProfie} >    {isFetching ? <CircularProgress /> : "Update Profile"}  </Button>
                <Button type='button' onClick={() => setupdatForm(false)}> Cancel  </Button>
              </DecisionWraaper>
            </UpdateForm>
            {!updatForm && <Button onClick={() => setupdatForm(true)}>Update Profile</Button >}
          </UserInfo>

          <Snackbar open={isUserUpdated} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Account Updated successfully!
                    </Alert>
                </Snackbar>
        </RightWrapper>
      </Wrapper>
    </Container>
  )
}

export default MyAccount