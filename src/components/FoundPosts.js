// collection of posts
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import React, { useState } from 'react';
import ShowItem from './Item';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// import LocationOnIcon from '@mui/icons-material/LocationOn'; --> location icon (need to install mui/icons-material)

const FoundPosts = ({ posts, itemsType }) => {
    const [showItem, setShowItem] = useState(false);
    const [getIndex, setIndex] = useState();

    const handleShowItem = (idx) => {
        setIndex(idx);
        setShowItem(true);
    };
    const handlesShowItemClose = () => setShowItem(false);
    
    return (
        <div>
            <ShowItem post={posts[getIndex]} show={showItem} handleClose={handlesShowItemClose} />
            {/* <ShowItem itemName={posts?.[getIndex]?.item} description={posts?.[getIndex]?.item} photo={posts?.[getIndex]?.img} location={posts?.[getIndex]?.location} contactInfo={"12345"}  show={showItem}
            handleClose={handlesShowItemClose}/> */}
            <ImageList alignItems="center" cols={3} rowHeight={1/5}>
                {Object.values(posts)
                    .filter(post => post.type===itemsType)
                    .map((post, idx) => {
                        return (
                            <div>   
                                <Card sx={{border: 1}}> 
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        width="300"
                                        image={post?.img}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div"> 
                                            { post?.item}
                                            </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Location: {post.location}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={(e) => handleShowItem(idx)}>See More</Button>
                                    </CardActions>
                                </Card> 
                            </div>
                        )
                    })
                }
            </ImageList>
        </div>
    )
};

export default FoundPosts;


