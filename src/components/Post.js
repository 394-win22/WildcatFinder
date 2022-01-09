import "./Post.css"
import bottle from "../imgs/bottle.png"
import ShowItem from './Item.js';
import React, { useState } from 'react';

const Post = ({ item, location, image }) => {

  const [showItem, setShowItem] = useState(false);
 
  const handlesShowItemClose = () => setShowItem(false);
  const handleShowItem = () => setShowItem(true);


    return (
        <div className="PostItem">
            <ShowItem itemName={item} description={item} photo={image} location={location} contactInfo={"12345"}  show={showItem}
            handleClose={handlesShowItemClose}/>
            <button className="btn btn-success fw-bold m-2" onClick={handleShowItem}>
                Show Details
            </button>
        </div>
    )
};

export default Post;