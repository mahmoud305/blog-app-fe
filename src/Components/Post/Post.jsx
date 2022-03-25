import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';
import Chip from '@material-ui/core/Chip';
import React from 'react'
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
    /* max-width: 90%;
    min-width: 70%; */
    width: 90%;
    margin: 5px auto;
    /* background: blue; */
`
const WriitenBy = styled.h3`
display: flex;
align-items: center;
/* background: salmon; */
padding: 5px ;
margin-bottom: 0%;
text-transform: capitalize; 
     
`
// const Rectangle = styled.div`
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: #FFFF23;
// `
const PostWrapper = styled.div`
/* background: red; */
    /* width: 10%; */
    margin: 0 auto;
    border: 2px dashed green;
    padding: 0px 20px 10px;
    font-size: 18px;

`
const Title = styled.h4`
 
text-align: center;
 
`
const Desc = styled.p`
 word-wrap: break-word;

`
const PostIcons = styled.div`
    display: flex;
    flex-direction: row-reverse;
    padding: 5px ;
    justify-content: end;
    margin: 10px;
`

function Post({ postInfo, profilePosts, deletePost, home ,reportPost ,showReportLayer }) {
    const userId =useSelector((state) => state.currentUser.id)
    let { CreatedBy, title, desc, blocked, _id } = postInfo;
    // console.log("home is", userId,);
    // console.log(postInfo);
    // console.log("hello"+ CreatedBy+" "+desc);
    return (
        <Wrapper>
            <WriitenBy>
                {CreatedBy.name}
            </WriitenBy>
            <PostWrapper>
                {profilePosts && <PostIcons>
                    <Avatar variant="rounded" onClick={() => deletePost(_id)}
                        style={{ background: 'red', marginLeft: '5px', cursor: "pointer" }}>
                        <DeleteIcon style={{ color: '#000' }}></DeleteIcon>
                    </Avatar>
                    <NavLink to={{ pathname: `/updatePost/${_id}`, postInfo: { title, desc } }}>
                        <Avatar variant="rounded" style={{ background: 'yellow', cursor: "pointer" }}>
                            <EditIcon style={{ color: '#000' }}></EditIcon>
                        </Avatar>
                    </NavLink>
                    {blocked && <Chip
                        icon={<BlockIcon style={{ color: "red" }} />}
                        label="Post Blocked"
                        variant="outlined"
                        style={{ fontWeight: 500, margin: "0px 5px" }}
                    />}</PostIcons>}
                {home && CreatedBy._id!==userId &&
                    < PostIcons >
                    <Button variant="contained" onClick={ ()=> showReportLayer(_id)} color="primary">
                        Report
                    </Button>
                    </PostIcons>
                }

            <Title>
                {/* LiverPool is very Powerfull */}
                {title}
            </Title>
            <Desc>
                {/* No asterisks. No caveats. And let’s face it, no contest. For the last few months a theory has been doing the rounds that the ersatz nature of the Premier League endgame, five weeks of press-ganged summerghost-ball,
             would drain the colour from Liverpool’s first league title in 30 years. */}
                {desc}
            </Desc>
        </PostWrapper>
        </Wrapper >
    )
}

export default Post