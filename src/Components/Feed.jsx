import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

import Upload from './Upload';

const Feed = () => {
  let { logout } = useContext(AuthContext);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center",alignItems:"center",flexDirection:"column"}}>
        <div style={{width:"50%"}}>
          <h1>Welcome to feed</h1>
          <button onClick={logout}>Logout</button>
        </div>
        <Upload/>
      </div>
    </div>
  );
};

export default Feed;
