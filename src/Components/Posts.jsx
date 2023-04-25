import React,{useEffect,useState} from 'react';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
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
                                <Videos url={post.pUrl}/>
                                <div className='fa' style={{display:'flex'}}>
                                <Avatar alt="Travis Howard" src={user.profileUrl} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            
        </div>
    );
}

export default Posts;