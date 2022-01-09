// collection of posts
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
// import LocationOnIcon from '@mui/icons-material/LocationOn'; --> location icon (need to install mui/icons-material)

const FoundPosts = ({ posts }) => {
    return (
        <div>
            <ImageList sx={{ width: 800, height: 600 }} cols={3} rowHeight={164}>
                {Object.values(posts).map(post => (
                    <ImageListItem>
                        <img src={post.img}
                             alt="items"
                             loading='lazy'/>
                        <ImageListItemBar
                             title={<span>location: {post.found_location} </span>}
                             position="below"
                        />
                    </ImageListItem>                                
            ))}
            </ImageList>
        </div>)

};

export default FoundPosts;