import React,{useContext} from 'react';
import {  Navigate,Outlet } from "react-router-dom";
import {AuthContext} from '../Context/AuthContext'
    
function PrivateRoute({component:Component,...rest}) {
    let {user} =useContext(AuthContext);
    console.log(user)
    return user !== null?<Outlet/>:<Navigate to="/login" />;
}

export default PrivateRoute;