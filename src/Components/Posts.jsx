import React,{useEffect,useState} from 'react';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Videos from './Videos';

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
                <div className='videoContainer'>
                    {
                        posts.map((post,index)=>(
                            <div key={index}>
                                <Videos url={post.pUrl}/>
                            </div>
                        ))
                    }
                </div>
            }
            
        </div>
    );
}

export default Posts;