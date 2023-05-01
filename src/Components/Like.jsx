import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { database } from "../firebase";

const Like = ({ user, post }) => {
  const [like, setLike] = useState(null);
  useEffect(() => {
    const checkLike = post.likes.includes(user.userId) ? true : false;
    setLike(checkLike);
  }, [post, user]);

  const handleChange = () => {
    if (like === true) {
      let newArr = post.likes.filter((it) => it !== user.userId);
      database.post.doc(post.postsId).update({
        likes: newArr,
      });
    } else {
      let newArr = [...post.likes, user.userId];
      database.post.doc(post.postsId).update({
        likes: newArr,
      });
    }
  };

  return (
    <div>
      {like !== null ? (
        <>
          {like === true ? (
            <FavoriteIcon
              onClick={handleChange}
              className={"icon-styling like"}
            />
          ) : (
            <FavoriteIcon
              onClick={handleChange}
              className={"icon-styling unlike"}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Like;
