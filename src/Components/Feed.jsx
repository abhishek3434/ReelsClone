import React,{useContext} from 'react';
import {AuthContext, AuthProvider} from '../Context/AuthContext'

const Feed = () => {
  const {user} =useContext(AuthContext)
  
    return (
        <div>
          Welcome to feed   {user.multiFactor.user.uid}
        </div>
    );
};

export default Feed;