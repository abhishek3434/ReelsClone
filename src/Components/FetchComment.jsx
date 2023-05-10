import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { Avatar, CircularProgress } from '@mui/material';
const FetchComment = ({post}) => {
    const[comments,setComments]=useState(null)
    useEffect(()=>{
        async function getComment(){
        let arr=[];
        for(const element of post.comments){
            let elem=await database.comments.doc(element).get()
            arr.push(elem.data())
        }
        setComments(arr);
    }
    getComment()
    },[post])
    return (
        <div>
            {
                comments === null?<CircularProgress/>:<>
                {
                    comments.map((comment,index)=>(
                        <div style={{display:'flex'}} key={index}>
                            <Avatar  src={comment.uProfileImage}/>
                            <p>&nbsp;&nbsp;<span style={{fontWeight:'bold'}} >{comment.uName}</span>&nbsp;&nbsp;{comment.text}</p>
                        </div>
                    ))
                }
                </>
            }
        </div>
    );
};

export default FetchComment;