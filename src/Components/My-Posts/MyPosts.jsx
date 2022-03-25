import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import styled from 'styled-components'
import { privateRequst, publicRequst } from '../../Axios'
import Post from '../Post/Post'
const Container = styled.div`
    min-height: 100vh;
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
`

const CPContainer = styled.div`
width:100%;
min-height: inherit;
 
display: flex;
justify-content: center;
align-items: center;
`


function MyPosts() {
    const [myPosts, setPosts] = useState([]);
    const { id } = useParams();


    async function getMyPosts() {
        try {
            // console.log(id);
            const { data } = await privateRequst.get(`getProfilePosts/${id}`);
            const posts = data.data;
            setPosts(posts);
            // console.log(posts);
        } catch (error) {
            console.log("error in profile Posts\n", error);
        }
    }
    
    //  useEffect(async () => {
    //     let res = await getMyPosts();
    //     console.log(res);
    //     console.log("hello");
    // }, [myPosts])// read on useMemo to handle the repitation of calling this useEffect

    useEffect(async () => {
       let res=  await getMyPosts();
    //    console.log("pop ",res);
    },[JSON.stringify(myPosts)] )
    function updatePost() {

    }


 

    async function deletePost(postId) {
        try {
            let response = await privateRequst.delete(`deletePost/${postId}`);
            let posts = myPosts.filter((x) => x._id != postId);
            setPosts(posts);
            // console.log(posts);
            // console.log("delete response \n", response);
        } catch (error) {
            console.log("error in deleting post\n", error);
        }
    }

  
    return (
        <Container>
            <Wrapper>
                {myPosts.length == 0 ? <CPContainer> <CircularProgress /> </CPContainer>
                    : myPosts.map((post) => <Post key={post._id} postInfo={post} profilePosts={true} deletePost={deletePost} />)}
            </Wrapper>

        </Container>

        // <div>MyPosts</div>
    )
}

export default MyPosts