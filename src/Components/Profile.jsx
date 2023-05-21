import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import Comments from './Comments';

import '../Style/profile.css';
import Navbar from './Navbar' 
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Like from './Like'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';

import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {
    const {id}=useParams()
    const[post,setPost]=useState()
    const[userData,setUserData]=useState()
    const[open,setOpen]=useState(null)

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserData(snap.data())
        })
    },[id])

    useEffect(()=>{
        async function fetchPost(){
        if(userData != null){
            let parr=[]
            for(let i=0;i<userData.postIds.length;i++){
                let data=await database.post.doc(userData.postIds[i]).get()
                parr.push({...data.data(),postsId:data.id});
            }
            setPost(parr)
        }        
    }
    fetchPost()
    
},[userData])



return (
        <div>
            {
               <>
               {
                   post==null || userData==null ? <CircularProgress/> : 
                   <>
                       <Navbar userData={userData}/>
                       <div className="spacer"></div>
                       <div className="container">
                           <div className="upper-part">
                               <div className="profile-img">
                                   <img src={userData.profileUrl}/>
                               </div>
                               <div className="info">
                                   <Typography variant="h5">
                                       Email : {userData.email}
                                   </Typography>
                                   <Typography variant="h6">
                                       Posts : {userData?.postIds?.length}
                                   </Typography>
                               </div>
                           </div>
                           <hr style={{marginTop:'3rem',marginBottom:'3rem'}}/>
                           <div className="profile-videos">
                           {
                               post.map((singlePost,index)=>(
                                   <React.Fragment key={index}>
                                       <div className="videos">
                                           <video muted="muted" onClick={()=>handleClickOpen(singlePost.pId)}>
                                               <source src={singlePost.pUrl}/>
                                           </video>
                                           <Dialog
                                               open={open===singlePost.pId}
                                               onClose={handleClose}
                                               aria-labelledby="alert-dialog-title"
                                               aria-describedby="alert-dialog-description"
                                               fullWidth ={true}
                                               maxWidth = 'md'
                                           >
                                               <div className="modal-container">
                                                   <div className="video-modal">
                                                       <video autoPlay={true} muted="muted" controls>
                                                           <source src={singlePost.pUrl}/>
                                                       </video>
                                                   </div>
                                                   <div className="comment-modal">
                                                   <Card className="card1" style={{padding:'1rem'}}>
                                                       <Comments postData={singlePost} url={singlePost.pUrl}/>
                                                   </Card>
                                                       <Card variant="outlined" className="card2">
                                                           <Typography style={{padding:'0.4rem'}}>{singlePost.likes.length===0?'Liked by nobody':`Liked by ${singlePost.likes.length} users`}</Typography>
                                                           <div style={{display:'flex'}}>
                                                               {/* <Like2 postData={post} userData={userData} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/> */}
                                                               {/* <AddComment style={{display:'flex',alignItems:'center',justifyContent:'center'}} userData={userData} postData={post}/> */}
                                                           </div>
                                                       </Card>
                                                   </div>
                                               </div>
                                           </Dialog>
                                       </div>
                                   </React.Fragment>
                               ))
                           }
                       </div>
                       </div>
                   </>
               }
               </>
            }
        </div>
    );
};

export default Profile;