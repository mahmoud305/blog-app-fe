import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Post from '../Post/Post'
import { CircularProgress, Snackbar } from '@material-ui/core';
import { privateRequst, publicRequst } from '../../Axios';
import { Alert } from '@material-ui/lab';
import Pagination from '../Pagination/Pagination';
 

const Container = styled.div`
    min-height: 100vh;
    background: #89ABE3FF;
    overflow: hidden;
`
const Wrapper = styled.div`
        display: flex;
        flex-direction: column-reverse;
        width: 90%;
        margin: 0 auto;
        max-width: 1200px;
        background: #FCF6F5FF;
        /* min-height: inherit; */
        margin: 30px auto;
        padding: 10px 0px;
         
`

const CPContainer = styled.div`
width:100%;
min-height: inherit;
 
display: flex;
justify-content: center;
align-items: center; 
`

const Layer = styled.div`
position: fixed;
top: 0%;
right: 0%;
left: 0%;
bottom: 0%;
background: rgba(0,0,0,0.3);
display: flex;
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

const Input = styled.textarea`
 
/* border: none;                                                                                */
width: 100%;
margin: 10px auto;
&::placeholder{
    font-size: 1.25rem;
}

padding: 10px 20px;
    min-width: 80%;
    min-height: 100px;
    max-height: 200px;
    margin: 10px auto;
    resize: vertical;
    word-wrap: break-word !important;
`

//--------------------------------------------------------
const Button = styled.button`
background: transparent;
/* width: 40%; */
padding: 10px 20px;
border: none;
color:#A07855FF;
background-color:#D4B996FF ;
font-weight: bold;
font-size: 1.25rem;
transition: all ease 0.5s ;
background: ${props => props.type == "submit" ?   "#2BAE66FF" : "#E94B3CFF"};
color: #2D2926FF;

&:hover{
  cursor: pointer;
  background: ${props => props.type == "submit" ?   "#2CBD77FF" : "#FA5C4DFF"};
  color :#FFF;
}


&:disabled{
  cursor: not-allowed;
  
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
const Label= styled.label`
font-size: 1.25rem ;`


 

function Home() {
    // const baseUrl="https://blog-user-posts-app3.herokuapp.com/";
    // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjYyODdkMGU2YjkxN2ZjYTBkM2VjNiIsImVtYWlsIjoiOTI5NDY3MTI4Y0BkcmFnb25tYWlsLmxpdmUiLCJpYXQiOjE2NDc4NjU5NjcsImV4cCI6MTY0ODAzODc2N30.DDq3hOnI1Nu84OnDadeqhSaoEafgHMzxJZz1gpPbswM`
    // const config={
    //     headers:{'Authorization':`Bearer ${token}`}
    // }
    const [posts, setPosts] = useState([]);
    const [report, setReport] = useState({postID:"",comment:""});
    const [reportLayer, setReportLayer] = useState(false);
    const [isPostReported, setIsPostReported] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [totalPosts, setTotalPosts] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);


 
    



    async function getPosts( ) {
        // const {data}= await axios.get('https://blog-user-posts-app3.herokuapp.com/getAllUsersPosts'
        // ,{ headers:{'Authorization':`Bearer ${token}`} }) ;
        try {

            const { data } = await privateRequst.get(`getAllUsersPosts?pageNum=${pageNumber}&pageSize=${pageSize}`);
            // https://blog-user-posts-app3.herokuapp.com/getAllUsersPosts?pageNum=2
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(async () => {
        // /
        try {
            setIsFetching(true);
            const res = await getPosts();
             
            setPosts(res.data.posts);
             
            setTotalPosts(res.data.totalCount);
           setIsFetching(false);
            // console.log(res.data[0]);
            // console.log(res.data[0].CreatedBy);
        } catch (error) {
            console.log(error);
        }
    }, [pageNumber]);

     
    
  async function reportPost() {
        try {
            let response = await privateRequst.put("/reportPost", report);
            setReportLayer(false);
            setIsPostReported(true);

        } catch (error) {
            console.log(error);
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsPostReported(false);
    };

    function showReportLayer(id){
        document.body.style.overflow = "hidden"
        const tempReport= {...report};
        tempReport.postID=id;
        setReport(tempReport);
        console.log("show");
        setReportLayer(true);
        console.log(report);
    };
    function closeReportLayer(){
        document.body.style.overflow = "auto"
        setReportLayer(false);
    };

function handleReportComment(e){
    const tempReport= {...report};
    tempReport.comment=e.target.value;
    setReport(tempReport);
}

    return (
        <Container>

            <Wrapper>
                {isFetching  ? <CPContainer> <CircularProgress /> </CPContainer>
                    : posts.map((post) => <Post key={post._id} postInfo={post} home={true} reportPost={reportPost} showReportLayer={showReportLayer} />)}

                <Snackbar open={isPostReported} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Post reported successfully!
                    </Alert>
                </Snackbar>
            </Wrapper>
          { posts.length &&  <Pagination  totalPosts={totalPosts} pageSize={pageSize} setPageNumber={setPageNumber} ></Pagination> } 
            <Layer 
            style={{ display:reportLayer?"flex":"none" , overflow:reportLayer?"hidden":"visible" }}
             >
                    <FormWrapper>
                  
                        <LoginForm>
                            <Label htmlFor="comment" >  </Label>
                            <Input autoFocus onChange={handleReportComment} type="text" name="comment" placeholder='Why to report this post ?'></Input>
                        </LoginForm>
                        <DecisionWraaper>
                            <Button type='submit' onClick={reportPost} >   Report  </Button>
                            <Button onClick={closeReportLayer}> Cancel  </Button>
                            
                        </DecisionWraaper>
                    </FormWrapper>
            </Layer>
         
        </Container>

    )
}

export default Home