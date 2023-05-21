import React, { useContext,useEffect,useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { database } from "../firebase";
import Upload from './Upload';
import Posts from './Posts'
import Navbar from './Navbar'


const Feed = () => {
  let { user } = useContext(AuthContext);
  let [userData,setUserData]=useState('');
  useEffect(()=>{
    let data=database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setUserData(snapshot.data())
    })
    return ()=>{data()};
  },[user])
 
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center",alignItems:"center",flexDirection:"column"}}>
        {/* <div style={{width:"50%"}}>
          <h1>Welcome to feed</h1>
          <button onClick={logout}>Logout</button>
        </div> */}
        <Navbar user={userData} />
        <Upload user={userData}/>
        <Posts user={userData}/>
      </div>
    </div>
  );
};

export default Feed;
