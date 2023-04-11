import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import "../Style/signup.css";

export default function Login() {
  const useStyles = makeStyles({
    text1: {
      textAlign: "center",
      color: "gray ",
    },
  });
  const classes = useStyles();

  return (
    <div className="signup-main">
      <div className="signup-div">
        <Card variant="outlined">
          <div className="logo">
            <img
              src="https://raw.githubusercontent.com/udai1931/reels-next-yt/master/assets/insta.jpg"
              alt=""
            />
          </div>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Signup to see more photos and videos from your friend
            </Typography>
            <Alert severity="error">
              This is an error alert — <strong>check it out!</strong>
            </Alert>

            <TextField id="outlined-basic" label="Full Name" variant="outlined" margin="dense" fullWidth size="small"/>
            <TextField id="outlined-basic" label="Email" variant="outlined" margin="dense" fullWidth size="small" />
            <TextField id="outlined-basic" label="Password" variant="outlined" margin="dense" fullWidth size="small" />
            <Button size="small" color="secondary" fullWidth margin="dense" startIcon={<CloudUploadIcon/>} variant="outlined" >Upload Image</Button>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
