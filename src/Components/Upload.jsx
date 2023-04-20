import React, { useState } from "react";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import LinearProgress from '@mui/material/LinearProgress';

const Upload = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile=async (e)=>{
    let file=e.target.files[0];
    if(file==null){
        setError('Please select a valid media');
        setTimeout(()=>{
            setError('');
        },3000);
        return;
    }
    if(file.size/1024*1024>100){
        setError('Selected video size is too large');
        setTimeout(()=>{
            setError('');
        },3000);
        return;
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
            style={{ display: "none" }}
          />
          <label htmlFor="upload-input">
            <Button
              variant="outlined"
              color="secondary"
              component="span"
              onClick={uploadFile}
              disabled={loading}
              startIcon={<UploadOutlinedIcon />}
            >
              Primary
            </Button>
          </label>
          {loading && <LinearProgress/>}
          
        </>
      )}
    </div>
  );
};

export default Upload;
