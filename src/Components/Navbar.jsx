import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import { useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "../Context/AuthContext";

export default function Navbar({ user }) {
  const history = useNavigate();

  let {logout}=React.useContext(AuthContext);
  
  const handleProfile = () => {
    history(`/profile/${user.userId}`);
  };
  const handleHome = () => {
    history(`/`);
  };

  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        minWidth: 1,
        margin: 1,
      }}
    >
      <AppBar
        position="static"
        sx={{ bgcolor: "mode.dark", color: "mode.dark" }}
      >
        <Toolbar style={{ "justify-content": "right" }}>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <PermIdentityIcon />Profile
          </Typography> */}
          {user!=null && <>
          <Button color="inherit" component="div" onClick={handleProfile}>
            <PermIdentityIcon />
            &nbsp; Profile
          </Button>
          </>
}
{user==null && <>
          <Button color="inherit" component="div" onClick={handleHome}>
            <PermIdentityIcon />
            &nbsp; Home
          </Button>
          </>
}
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
