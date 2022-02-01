// collection of posts
import React, { useState } from 'react';
import ShowItem from './Item';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import ShowEmailForm from './EmailForm';
import Grow from '@mui/material/Grow';
import './FoundPosts.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const IconStyle = {
    borderRadius: 1,
    '&:hover': {
        bgcolor: "rgba(219,219,219,0.95)"
    },
    '&:focus': {
        bgcolor: "rgba(219,219,219,0.95)"
    },
}

const ButtonStyle = {
    '&:hover': {
        bgcolor: "rgba(188,213,255,0.34)"
    },
    '&:focus': {
        bgcolor: "rgba(188,213,255,0.34)"
    },
}

const theme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
            'sans-serif',
        ].join(','),
        subtitle: {
            fontWeight: 500,
            fontSize: '1.25rem',
            '@media(max-width:800px)': {
                fontSize: '.75rem',
            }
        },
        h6: {
            fontSize: '1.5rem',
            '@media(max-width:800px)': {
                fontSize: '1rem',
            }
        },
    },
});

const FoundNotes = () => {
    return (
        <div className="Notes">Don't see what you lost? Add it!</div>
    )
}

const LostNotes = () => {
    return (
        <div className="Notes">Not reported lost? Add it!</div>
    )
}


const FoundPosts = ({ posts, itemsType, searchTerm, profile, user}) => {
    const [showItem, setShowItem] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [getIndex, setIndex] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteItemIdx, setDeleteItemIdx] = useState();
    const [deleteItemName, setDeleteItemName] = useState();

    const deleteItems =  (idx, name) => {
        setDeleteItemName(name);
        setDeleteItemIdx(idx);
        setOpenDialog(true);
    }

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
            <ShowItem post={posts[getIndex]} show={showItem} handleClose={handlesShowItemClose} />
            <ShowEmailForm toEmail={getIndex ? posts[getIndex].contact_info : null} show={showEmailForm} handleClose={handleShowEmailFormClose} user ={user}/>
            <DeleteConfirmDialog idx={deleteItemIdx} open={openDialog} setOpen={setOpenDialog} deleteItemName={deleteItemName}/>
            <Grid container spacing={2}>
                {Object.entries(posts).reverse()
                    .filter(post => profile ? post[1].user_id === user.email : true)
                    .filter(post => post[1].type === itemsType)
                    .filter(post => post[1].itemName.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((post) => {
                            return (
                                <Grid item xs={12} sm={6} md={3} key={post[0]}>
                                    <ThemeProvider theme={theme}>
                                        <Grow in={true} {...({ timeout: 1000 })}>
                                            <Card sx={{
                                                border: 1,
                                                borderColor: '#D6D6D6',
                                                borderRadius: 4,
                                                height: '100%',
                                                // m: 2,
                                                boxShadow: '2px 2px 2px 1px #D6D6D6',
                                                p: 3
                                            }}>
                                                <CardMedia
                                                    component="img"
                                                    height="180"
                                                    width="auto"
                                                    image={post[1]?.img}
                                                />
                                                <CardContent sx={{
                                                    pt: 1,
                                                    pb: 0,
                                                }}>
                                                    <ThemeProvider theme={theme}>
                                                        <Typography gutterBottom variant="h6" component="div">
                                                            {post[1]?.itemName}
                                                        </Typography>
                                                    </ThemeProvider>
                                                    <ThemeProvider theme={theme}>
                                                        <Typography variant="subtitle" color="text.secondary" sx={{ p: 0 }}>
                                                            <LocationOnIcon sx={{
                                                                mr: 1,
                                                                mb: 1
                                                            }} />
                                                            {post[1].location}
                                                        </Typography>
                                                    </ThemeProvider>
                                                </CardContent>
                                                <CardActions sx={{ p: 0 }}>
                                                    <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
                                                        <Button sx={ButtonStyle} onClick={() => handleShowItem(post[0])}>See More</Button>
                                                    </Box>
                                                    <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
                                                        <Button sx={ButtonStyle} onClick={() => handleShowEmailForm(post[0])}>Send Email</Button>
                                                    </Box>
                                                    { user && post[1].user_id === user.email ? <DeleteForeverIcon fontSize={"medium"}
                                                                                                                  onClick={() => deleteItems(post[0], post[1].itemName)}
                                                                                                                  sx={IconStyle}/> : null}
                                                </CardActions>
                                            </Card>
                                        </Grow>
                                    </ThemeProvider>
                                </Grid>
                            )
                        })
                }
            </Grid>

            { itemsType === 'Lost' ? <LostNotes /> : <FoundNotes />}
        </div>
    )
};

export default FoundPosts;


