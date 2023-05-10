import React, { useState } from "react";
import Videos from "./Videos";
import '../Style/post.css'

import InsertCommentIcon from "@mui/icons-material/InsertComment";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import LikeModal from "./LikeModal";
import AddComment from "./AddComment";
import FetchComment from "./FetchComment";

const Comments = ({ user, post,url}) => {
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <InsertCommentIcon
        className="comment comment-position"
        onClick={() => handleClickOpen(post.postsId)}
      />
      <Dialog
        open={open === post.postsId}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <div className="modal-container">
          <div className="video-comment-container">
            <Videos url={url} scrollNext={false}  />
          </div>
          <div className="comment-container">
            <Card className='comment-modal' sx={{ maxWidth: 345 }}>
              <FetchComment post={post}/>
            </Card>
            <Card  variant="outlined">
              
              <div style={{'display':'flex'}}>
              <Typography>{post.likes.length!==0?'Liked By '+post.likes.length:''} </Typography>
              <LikeModal user={user} post={post}/> 
              </div>             
              <AddComment user={user} post={post}/>
            </Card>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Comments;
