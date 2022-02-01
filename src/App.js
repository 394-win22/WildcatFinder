import './App.css'
import React, { useEffect, useState } from 'react';
import {useData, useUserState,signInWithGoogle} from './utilities/firebase';
import Banner from './components/Banner'
import FoundPosts from './components/FoundPosts'
import MakePost from './components/MakePost'
import {Loading} from "./components/Loading";
import {Error404} from "./components/404";
import {NavigationBar} from "./components/NavigationBar";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Grow from '@mui/material/Grow';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import Button from "@mui/material/Button";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Title = {
  title: "WildcatFinder",
  subtitle: "Lost & Found",
  descriptionLine: "Found or lost something? WildcatFinder is here to help! Reporting items today!"
}

const buttonStyle = (selected) => {
  return {
    width: 1,
    height: 1,
    marginLeft: "10%",
    marginRight: "10%",
    bgcolor: selected ? "rgba(14,86,171,0.95)" : "inherit",
    borderRadius: 2,
    color: "rgb(255, 255, 255)",
    '&:hover': {
      bgcolor: selected ? "rgba(109,153,200,0.95)" : "rgba(129,182,239,0.95)"
    },
    '&:focus': {
      bgcolor: "rgba(129,182,239,0.95)"
    },
  }
}

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  backgroundColor: "#1E90FFFF",
  left: 0,
  right: 0,
  margin: '0 auto',
  '&:hover': {
    backgroundColor: "rgba(129,182,239,0.95)"
  },
  '&:focus': {
    backgroundColor: "rgba(129,182,239,0.95)"
  },
});

function App() {
  const [itemsType, setItemsType] = useState("Found");
  const [makePost, setMakePost] = useState(false);
  const handleMakePost = () => setMakePost(true);
  const handlesMakePostClose = () => setMakePost(false);
  const [data, loadingData, errorData] = useData("/");
  const [user] = useUserState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [profile, setProfile] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSnackBarClose = () => setOpen(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  const PostWithoutSignIn = () => {
    setOpen(true);
    signInWithGoogle();
  }

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  useEffect(() => {
    if (data === undefined) return;
  }, [data])
  if (errorData) return <Error404 />;
  if (loadingData) return <Loading isMobile={isMobile}/>;

  return (
    <div className="App">
      <Banner title={Title.title}
              subtitle={Title.subtitle}
              descriptionLine={Title.descriptionLine}/>

      <div className="NavigationBar">
        <NavigationBar user={user} setSearchTerm={setSearchTerm} setProfile={setProfile} searchTerm={searchTerm}/>
      </div>

      <div className="FoundPosts">
        <FoundPosts posts={data} itemsType={itemsType} searchTerm={searchTerm} profile={profile} user={user}/>
      </div>

      <div className="BottomBanner">
        <Grow in={true} {...({ timeout: 2000 })}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }} enableColorOnDark={true}>
              <Toolbar>
                <Button sx={buttonStyle(itemsType === "Lost")} onClick={() => setItemsType("Lost")}> Lost </Button>
                <StyledFab color="primary" size="medium" aria-label="add" onClick={() => user === null ? PostWithoutSignIn() : handleMakePost()}>
                  <AddIcon />
                </StyledFab>
                <Snackbar open={open}
                          autoHideDuration={3000}
                          onClose={handleSnackBarClose}
                          anchorOrigin={{horizontal: "center", vertical:"top"}}>
                  <Alert onClose={handleSnackBarClose} severity="info" sx={{ width: '100%' }}>
                    Please Log in to post.
                  </Alert>
                </Snackbar>
                <Button sx={buttonStyle(itemsType === "Found")} onClick={() => setItemsType("Found")}> Found </Button>
                <MakePost show={makePost} handleClose={handlesMakePostClose} posts={data} isMobile={isMobile} user={user}/>
              </Toolbar>
            </AppBar>
          </Box>
        </Grow>
      </div>
    </div>
  );
}

export default App;