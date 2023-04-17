import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
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
import { AuthContext } from "../Context/AuthContext";

export default function Signin() {
  const { login,setUser } = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const history = useNavigate();

  const getPassword = (e) => {
    let password = e.target.value;
    setPassword(password);
  };
  const getEmail = (e) => {
    let email = e.target.value;
    setEmail(email);
  };

  const onLogin = async () => {
    try {
      let userObj = await login(email, password);
      setUser(userObj.multiFactor.user.uid);
      history("/");
    } catch (error) {
      setError(error.code);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const useStyles = makeStyles({
    text1: {
      textAlign: "center",
      color: "gray ",
    },
    text2: {
      textAlign: "center",
    },
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
              Signin to see more photos and videos from your friend
            </Typography>
            {error !== "" && <Alert severity="error">{error}</Alert>}

            <TextField
              id="outlined-basic-email"
              label="Email"
              variant="outlined"
              margin="dense"
              fullWidth
              size="small"
              onChange={getEmail}
            />
            <TextField
              id="outlined-basic-password"
              label="Password"
              variant="outlined"
              margin="dense"
              fullWidth
              size="small"
              onChange={getPassword}
            />
          </CardContent>
          <Typography color="primary" className={classes.text2}>
            Forgot password?
          </Typography>
          <CardActions>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={onLogin}
            >
              SignIn
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Don't have account ?<Link to="/signup">SignUp</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
