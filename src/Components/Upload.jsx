import React, { useState } from "react";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import LinearProgress from '@mui/material/LinearProgress';

import {v4 as uuidv4} from 'uuid'

import {database,storage} from '../firebase';

const Upload = ({user}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile=async (file)=>{
    if(file==null){
        setError('Please select a valid media');
        setTimeout(()=>{
            setError('');
        },3000);
        return;
    }
    if((file.size/(1024*1024))>100){
        setError('Selected video size is too large');
        setTimeout(()=>{
            setError('');
        },3000);
        return;
    }
    let uid = uuidv4();
    setLoading(true)
    const uploadTask = storage.ref(`/post/${uid}/${file.name}`).put(file);
      uploadTask.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        console.log(snapshot);
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} done.`);
      }
      function fn2(error) {
        
        setTimeout(() => {
          setError("");
        }, 3000);
        setLoading(false);
        return;
      }
      function fn3() {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          let obj={
            likes:[],
            comments:[],
            pId:uid,
            pUrl:url,
            uName:user.fullname,
            uProfile:user.profileUrl,
            userId:user.userId,
            createdAt: database.getTime()
          }
          database.post.add(obj).then(async(ref)=>{
            let res=await database.users.doc(user.userId).update({
              postIds:user.postIds!=null ? [...user.postIds,ref.id] : [ref.id]
            })
          }).then(()=>{
            setLoading(false)
          }).catch(err=>{
            console.log(err)
            setError(err.code)
            setTimeout(()=>{
              setError('')
            },4000)
          })
          setLoading(false)
        });
      }

  }

  return (
    <div>
      {error !== "" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <input
            type="file"
            accept="video/*"
            id="upload-input"
            onChange={(e)=>uploadFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <label htmlFor="upload-input">
            <Button
              variant="outlined"
              color="secondary"
              component="span"
              disabled={loading}
              startIcon={<UploadOutlinedIcon />}
            >
              Upload
            </Button>
          </label>
          {loading && <LinearProgress/>}
        </>
      )}
    </div>
  );
};

export default Upload;
