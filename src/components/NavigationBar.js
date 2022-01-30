import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import {SignInOut} from "./LogInButtons";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import React, {useState,useEffect} from "react";

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


export const NavigationBar = ({user, setSearchTerm, setProfile}) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Grow in={true} {...({ timeout: 2000 })}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className = "appbar" position={(scrollPosition > 250 ) ? "fixed" : "relative"} enableColorOnDark={true}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <HomeIcon onClick={() => setProfile(false)}/>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <AccountCircle onClick={() => user ? setProfile(true) : {}}/>
                        </IconButton>
                        <SignInOut setProfile={setProfile}/>
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
                        <Button sx={{color:"inherit"}} onClick={() => setSearchTerm("")}> clear </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Grow>
    );
}