import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Feed = () => {
 let {logout} =useContext(AuthContext)
    return (
        <div>
          Welcome to feed
          <button onClick={logout}>Logout</button>   
        </div>
    );
};

export default Feed;