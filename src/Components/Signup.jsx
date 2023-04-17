import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import "../Style/signup.css";
import { AuthContext } from "../Context/AuthContext";

import { storage, database} from "../firebase";


export default function Signup() {
  const useStyles = makeStyles({
    text1: {
      textAlign: "center",
      color: "gray ",
    },
  });
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useNavigate();
  const { signup } = useContext(AuthContext);

  const getName = (e) => {
    let name = e.target.value;
    setName(name);
  };
  const getEmail = (e) => {
    let email = e.target.value;
    setEmail(email);
  };
  const getPassword = (e) => {
    let password = e.target.value;
    setPassword(password);
  };

  const getFile = (e) => {
    let newFile = e.target.files[0];
    setFile(newFile);
  };

  const signinSubmit = async () => {
    if (file === null) {
      setError("Please upload image first");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    


    try {
      setLoading(true);
      setError("");
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      const uploadTask = storage.ref(`/data/${uid}/profilepicture`).put(file);
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
          database.users.doc(uid).set({
            email: email,
            userId: uid,
            fullname: name,
            profileUrl: url,
            createdAt: database.getTime(),
          });
        });
      }
      history("/");
    } catch (error) {
      setError(error.code)
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    setLoading(false);
  };

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
            {error !== "" && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            <TextField
              id="outlined-basic_name"
              label="Full Name"
              type="text"
              variant="outlined"
              margin="dense"
              fullWidth
              size="small"
              onChange={getName}
            />
            <TextField
              id="outlined-basic_email"
              type="email"
              label="Email"
              variant="outlined"
              margin="dense"
              fullWidth
              size="small"
              onChange={getEmail}
            />
            <TextField
              id="outlined-basic_password"
              label="Password"
              type="password"
              variant="outlined"
              margin="dense"
              fullWidth
              size="small"
              onChange={getPassword}
            />
            <Button
              size="small"
              color="secondary"
              fullWidth
              margin="dense"
              startIcon={<CloudUploadIcon />}
              variant="outlined"
              component="label"
            >
              Upload Image
              <input type="file" onChange={getFile} hidden />
            </Button>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth
              disabled={loading}
              variant="contained"
              onClick={signinSubmit}
            >
              SignUp
            </Button>
          </CardActions>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              By signing up, you agree our terms and condition
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Having account ?<Link to="/login">Login</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
