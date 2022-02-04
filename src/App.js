import './App.css'
import React, { useEffect, useState } from 'react';
import {useData, useUserState,signInWithGoogle, signOut} from './utilities/firebase';
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
    bgcolor: selected ? "#674b94" : "inherit",
    borderRadius: 2,
    color: "rgb(255, 255, 255)",
    '&:hover': {
      bgcolor: selected ? "#674b94" : "#674b94"
    },
    '&:focus': {
      bgcolor: "#674b94"
    },
  }
}

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  backgroundColor: "#674b94" ,
  left: 0,
  right: 0,
  margin: '0 auto',
  '&:hover': {
    backgroundColor: "#74589d"
  },
  '&:focus': {
    backgroundColor: "#74589d"
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
  const [domainAlert, setDomainAlert] = useState(false);

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

  // validate user email domain
  useEffect(() => {
    if (user && !RegExp('(.*)@(.*)northwestern.edu').test(user?.email)) {
      setDomainAlert(true);
      signOut();
    }
  }, [user])

  if (errorData) return <Error404 />;
  if (loadingData) return <Loading isMobile={isMobile}/>;

  return (
    <div className="App">
      <Banner title={Title.title}
              subtitle={Title.subtitle}
              descriptionLine={Title.descriptionLine}
              isMobile={isMobile}
              />

      <div className="NavigationBar">
        <NavigationBar user={user} setSearchTerm={setSearchTerm} setProfile={setProfile} searchTerm={searchTerm}/>
      </div>

      <div className="FoundPosts">
        <FoundPosts posts={data} itemsType={itemsType} searchTerm={searchTerm} profile={profile} user={user}/>
      </div>

      <div className="BottomBanner">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: '#4c2c83'}} enableColorOnDark={true}>
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
                  Please log in to post.
                </Alert>
              </Snackbar>
              <Snackbar open={domainAlert}
                        onClose={() => setDomainAlert(false)}
                        anchorOrigin={{horizontal: "center", vertical:"top"}}>
                <Alert onClose={() => setDomainAlert(false)} severity="error" sx={{ width: '100%' }}>
                  You must use a Northwestern email to log in.
                </Alert>
              </Snackbar>
              <Button sx={buttonStyle(itemsType === "Found")} onClick={() => setItemsType("Found")}> Found </Button>
              <MakePost show={makePost} handleClose={handlesMakePostClose} posts={data} isMobile={isMobile} user={user}/>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </div>
  );
}

export default App;