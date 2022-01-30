import  Button  from "@mui/material/Button";
import { signInWithGoogle, useUserState } from "../utilities/firebase";
import React, { useState } from 'react';


const buttonStyle = {
    mx: 2,
    width: 1 / 14,
    margin: '1%',
    bgcolor: "rgba(28,133,255,0.95)",
    borderRadius: 2,
    color: "rgb(255, 255, 255)",
    '&:hover': {
      bgcolor: "rgba(129,182,239,0.95)"
    },
    '&:focus': {
      bgcolor: "rgba(129,182,239,0.95)"
    },
  }
const handleMyPosts = ( user, posts, setPost,clicked,setClicked)=>{
  if(!clicked){
    let myPosts = Object.values(posts).filter(post => post['user_id'] === user['email']);
    setPost(myPosts);
    setClicked(true);
  }
  else{
    setPost(posts);
    setClicked(false);
  }
}
export const MyPosts = ( {posts , setPost} )=>{
    const [user] = useUserState();
    const [clicked,setClicked] = useState(false);
    return ( 
        <Button sx={buttonStyle} onClick={() => user === null ? signInWithGoogle() : handleMyPosts(user, posts, setPost,clicked,setClicked)}> 
          My Posts 
        </Button>
        
    );
};