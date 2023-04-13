import * as React from "react";
import {Link} from 'react-router-dom';

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

import "../Style/signin.css";

export default function Signin() {
  const useStyles = makeStyles({
    text1: {
      textAlign: "center",
      color: "gray ",
    },
    text2:{
        textAlign:"center"
    }
  });
  const classes = useStyles();

  return (
    <div className="signin-main">
      <div className="signin-div">
        <Card variant="outlined">
          <div className="logo">
            <img
              src="https://raw.githubusercontent.com/udai1931/reels-next-yt/master/assets/insta.jpg"
              alt=""
            />
          </div>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              signin to see more photos and videos from your friend
            </Typography>
            <Alert severity="error">
              This is an error alert — <strong>check it out!</strong>
            </Alert>

           
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              margin="dense"
              fullWidth
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              margin="dense"
              fullWidth
              size="small"
            />
            
          </CardContent>
          <Typography color="primary" className={classes.text2}>
            Forgot password?
          </Typography>
          <CardActions>
            <Button color="primary" fullWidth variant="contained">SignIn</Button>
          </CardActions>
        </Card>
        <Card variant="outlined">
        <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Don't have account ?<Link to='/signin'>signin</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
