// collection of posts
import React, { useState } from 'react';
import ShowItem from './Item';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled, shadows } from '@mui/system';
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import ShowEmailForm from './EmailForm';

const cardStyle = styled('div')({
    color: '#f50505',
    backgroundColor: {
        xs: "secondary.light", sm: "#0000ff"
    },
    boxShadow: 6,
});

const theme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
            'sans-serif',
        ].join(','),
        subtitle: { fontWeight: 500 },
    },
});


const FoundPosts = ({ posts, itemsType }) => {
    const [showItem, setShowItem] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [getIndex, setIndex] = useState();
    
    const handleShowEmailForm = (idx) => {
        setIndex(idx);
        setShowEmailForm(true);
    };
    const handleShowEmailFormClose = () => setShowEmailForm(false);

    const handleShowItem = (idx) => {
        setIndex(idx);
        setShowItem(true);
    };
    const handlesShowItemClose = () => setShowItem(false);

    return (
        <div style={{ marginTop: "5rem", marginLeft: "10%", marginRight: "10%" }}>
            <ShowItem post={Object.values(posts)
                .filter(post => post.type === itemsType)[getIndex]} show={showItem} handleClose={handlesShowItemClose} />
            <ShowEmailForm toEmail={Object.values(posts)
                .filter(post => post.type === itemsType)[getIndex]?.['contact_info']} show={showEmailForm} handleClose={handleShowEmailFormClose} />
            <Grid container spacing={2}>
                {Object.values(posts)
                    .filter(post => post.type === itemsType)
                    .map((post, idx) => {
                        return (
                            <Grid item xs={12} sm={6} md={3} key={idx}>
                                <ThemeProvider theme={theme}>
                                    <Card sx={{
                                        border: 1,
                                        borderColor: '#D6D6D6',
                                        borderRadius: 4,
                                        height: '100%',
                                        //m: 2,
                                        boxShadow: '2px 2px 2px 1px #D6D6D6'
                                    }}>
                                        <CardMedia
                                            component="img"
                                            height="150"
                                            width="100%"
                                            image={post?.img}
                                        />
                                        <CardContent sx={{
                                            pt: 1,
                                            pb: 0
                                        }}>
                                            <ThemeProvider theme={theme}>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    {post?.itemName}
                                                </Typography>
                                            </ThemeProvider>
                                            <ThemeProvider theme={theme}>
                                                <Typography variant="subtitle" color="text.secondary" sx={{ p: 0 }}>
                                                    <LocationOnIcon sx={{
                                                        mr: 1,
                                                        mb: 1
                                                    }} />
                                                    {post.location}
                                                </Typography>
                                            </ThemeProvider>
                                        </CardContent>
                                        <CardActions sx={{ p: 0 }}>
                                            <Box sx={{ marginLeft: "25%", marginRight: 1 }}>
                                                <Button onClick={(e) => handleShowItem(idx)}>See More</Button>
                                            </Box>
                                            <Box sx={{ marginLeft: "auto", marginRight: 1 }}>
                                                <Button onClick={(e) => handleShowEmailForm(idx)}>Send Email</Button>
                                            </Box>

                                        </CardActions>
                                    </Card>
                                </ThemeProvider>



                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
};

export default FoundPosts;


