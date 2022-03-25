import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { privateRequst } from '../../Axios'
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Container = styled.div`
    min-height: 100vh;
    background: #89ABE3FF;
    overflow: hidden;
`
const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
        width: 90%;
        
        max-width: 1200px;
        background: #FCF6F5FF;
        min-height: inherit;
        margin: 30px auto;
        padding: 10px 0px;
`
const Form = styled.form`
display: flex;
flex-direction: column;
background: blue;
padding: 20px 5px;
 min-width: 70%;
`
const Input = styled.input`
    padding: 10px 20px;
    min-width: 80%;
    margin: 10px auto;
    /* border: none; */
`
const Desc = styled.textarea`
    padding: 10px 20px;
    min-width: 80%;
    min-height: 100px;
    max-height: 200px;
    margin: 10px auto;
    resize: vertical;
    word-wrap: break-word !important;
    /* scroll-behavior: ; */
    /* wrap=hard; */
    /* margin: auto; */
    /* border: none; */
`
const Decision = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-around;
`
const Button = styled.button`
border: none;
border-radius: 5px;
font-size: 1.25rem;
    padding: 10px 20px;
    font-weight: Bold;
    background: ${props=>props.type=="submit"? "#2BAE66FF":"#E94B3CFF"} ;
    color:${props=>props.type=="add"? "#FCF6F5FF":"#2D2926FF"};
    transition: all ease 0.5s;
    &:hover{
        cursor: pointer;
        background: ${props=>props.type=="submit"? "#2BBE66FF":"#ED5B3CFF"}   ;
    }

    & >*{
        text-decoration: none;
        color: #2D2926FF;
    }
`
const Parg=styled.p`
    color: #000 ;
    background: #FFF ;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
`

function AddPost() {

    const [post, setPost] = useState({title:"",desc:""});
    const [isFetching, setisFetching] = useState(false);
    const [success, setSuccess] = useState(false);
    const history= useHistory();
    function handlePost(e){
        let tempPost={...post};
        tempPost[e.target.name]=e.target.value;
        setPost(tempPost);
        console.log(post);
    }

    useEffect(() => {
      let timer=setTimeout( ()=>{
        if(success)
            history.push("/home");
      } , 3000 );
        
                
      return () => {
        clearTimeout(timer);
      }
    }, [success])
    

   async function AddPost(e){
       e.preventDefault();
    setisFetching(true);    
    try {
            const { data }=await privateRequst.post("addPost",post);
            setSuccess(true);
            setisFetching(false);    
            
        } catch (error) {
            console.log("error in adding post\n",error);
            setSuccess(false);

            setisFetching(false);    

        }
    }
    return (
        <Container>
            <Wrapper>
                <Form>
                    <Input onChange={handlePost} type="text" placeholder='Title' name='title'>
                    </Input>
                    <Desc  onChange={handlePost} wrap="hard" placeholder='Description' name='desc'>
                    </Desc>
                    <Decision>
                        <Button onClick={AddPost}  disabled={isFetching} type="submit" >
                             {isFetching?<CircularProgress/>:  "Post" }
                        </Button>
                        <Button type="cancel">
                            <NavLink to="/home"> Cancel  </NavLink>
                        </Button>
                        
                    </Decision>
                   {success &&  <Parg>Post Added Successfully</Parg> }
                </Form>
                
            </Wrapper>
        </Container>
    )
}

export default AddPost