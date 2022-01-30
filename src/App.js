import './App.css'
import Banner from './components/Banner'
import FoundPosts from './components/FoundPosts'
import Button from "@mui/material/Button";
import MakePost from './components/MakePost'
import React, { useEffect, useState } from 'react';
import {useData, useUserState} from './utilities/firebase';
import { SignInOut } from './components/LogInButtons';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 2,
  float: 'right',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
      '&:focus': {
        width: '55ch',
      },
    },
  },
}));

const Title = {
  title: "WildcatFinder",
  subtitle: "Lost & Found",
  descriptionLine: "Found or lost something? WildcatFinder is here to help! Reporting items today!"
}

const buttonStyle = {
  width: 1,
  height: 1,
  marginLeft: "10%",
  marginRight: "10%",
  bgcolor: "inherit",
  borderRadius: 2,
  color: "rgb(255, 255, 255)",
  '&:hover': {
    bgcolor: "rgba(129,182,239,0.95)"
  },
  '&:focus': {
    bgcolor: "rgba(129,182,239,0.95)"
  },
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

  useEffect(() => {
    if (data === undefined) return;
  }, [data])

  if (errorData) return <h1>{errorData}</h1>;
  if (loadingData) return <h1>Loading the data...</h1>;

  return (
    <div className="App">
      <Banner title={Title.title}
              subtitle={Title.subtitle}
              descriptionLine={Title.descriptionLine}/>

      <div className="NavigationBar">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="relative" enableColorOnDark={true}>
            <Toolbar>
              <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <SignInOut />
              <Typography
                  variant="body1"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                { user ? <span> Welcome! {user.email} </span>: <span>Please log in to check your posts</span>}
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(event) => {setSearchTerm(event.target.value)} }
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      <div className="FoundPosts">
        <FoundPosts posts={data} itemsType={itemsType} searchTerm={searchTerm} />
      </div>

      <div className="BottomBanner">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }} enableColorOnDark={true}>
            <Toolbar>
              <Button sx={buttonStyle} onClick={() => setItemsType("Lost")}> Lost </Button>
              <StyledFab color="secondary" aria-label="add" onClick={() => handleMakePost()}>
                <AddIcon />
              </StyledFab>
              <Button sx={buttonStyle} onClick={() => setItemsType("Found")}> Found </Button>
              <MakePost show={makePost} handleClose={handlesMakePostClose} posts={data} />
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </div>
  );
}

export default App;