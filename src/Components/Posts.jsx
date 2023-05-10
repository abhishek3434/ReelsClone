import React,{useEffect,useState} from 'react';
import Like from './Like'

import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Comments from './Comments';

import Avatar from '@mui/material/Avatar';
import Videos from './Videos';
import '../Style/post.css'


function Posts({user}) {
    const [posts,setPost]=useState(null);
    useEffect(()=>{
        let par=[];
        const unsub=database.post.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
            par=[]
            querySnapshot.forEach((doc)=>{
                let data={...doc.data(),postsId:doc.id}
                par.push(data)
            })
            setPost(par)
        })
        return ()=>unsub();
    },[])
    return (
        <div>
            {
                user==null || posts==null?<CircularProgress />:
                <div className='video-container'>
                    {
                        posts.map((post,index)=>(
                            <div className='video' key={index}>
                                <Videos url={post.pUrl} scrollNext={true}/>
                                <div className='fa' style={{display:'flex'}}>
                                <Avatar src={user.profileUrl} />
                                {/* <h5>{user.fullname}</h5> */}
                                </div>
                                <Like user={user} post={post}/>
                                <Comments user={user} post={post} url={post.pUrl}/>                               
                            </div>
                        ))
                    }
                </div>
            }
            
        </div>
    );
}

export default Posts;