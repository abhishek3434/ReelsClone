import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {database} from '../firebase'

const AddComment = ({user,post}) => {
    const[text,setText] = useState('');

    const handleClick=()=>{
        let obj={
            text:text,
            uProfileImage:user.profileUrl,
            uName:user.fullname
        }
        database.comments.add(obj).then((doc)=>{
            database.post.doc(post.postsId).update({
                comments:[...post.comments,doc.id]
            })
        })
        setText('')
    }

    return (    
        <div>
             <TextField id="filled-basic" label="Comment" value={text} variant="outlined" size="small" onChange={(e)=>setText(e.target.value)} />
             <Button variant="contained" onClick={handleClick}>Post</Button>
        </div>
    );
};

export default AddComment;