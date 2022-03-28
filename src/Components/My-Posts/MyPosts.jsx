import { CircularProgress } from '@material-ui/core'
 
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import styled from 'styled-components'
import { privateRequst, publicRequst } from '../../Axios'
import Pagination from '../Pagination/Pagination'
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
    const [totalPosts, setTotalPosts] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [isFetching, setIsFetching] = useState(false);
    async function getMyPosts() {
        try {
            // console.log(id);
            const { data } = await privateRequst.get(`getProfilePosts/${id}?pageNum=${pageNumber}&pageSize=${pageSize}`);
            return data;
            
           
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
        setIsFetching(true);
        
        let res = await getMyPosts();
        const posts = res.data.posts;
        setTotalPosts(res.data.totalCount);
        setPosts(posts);
        setIsFetching(false)
        //    console.log("pop ",res);

    }, [pageNumber, JSON.stringify(myPosts)])

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
                {isFetching ? <CPContainer> <CircularProgress /> </CPContainer>
                    : myPosts.map((post) => <Post key={post._id} postInfo={post} profilePosts={true} deletePost={deletePost} />)}
            </Wrapper>
            {myPosts.length && <Pagination totalPosts={totalPosts} pageSize={pageSize} setPageNumber={setPageNumber} ></Pagination>}
        </Container>

        // <div>MyPosts</div>
    )
}

export default MyPosts