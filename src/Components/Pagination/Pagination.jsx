import React from 'react'
import styled from 'styled-components'
import PaginationMUI from '@material-ui/lab/Pagination';


const PaginationWraaper = styled.div`
 
margin: 10px auto;
/* background: #FFDDFF; */
display: flex;
justify-content: center;
 
`
function Pagination({totalPosts ,setPageNumber ,pageSize}) {
    
    function handleClick(e){
      
        setPageNumber(e.target.textContent);
        // console.log(e.target.name);
    }
  return (
    <PaginationWraaper>
    <PaginationMUI onChange={handleClick}  count={Math.ceil(totalPosts/pageSize)} variant="outlined" color="primary" />
    </PaginationWraaper>
  )
}

export default Pagination