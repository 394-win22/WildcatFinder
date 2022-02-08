import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { SignInOut } from "./LogInButtons";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import { signInWithGoogle } from '../utilities/firebase.js';

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

const buttonStyle = {
    mx: 2,
    margin: '1%',
    bgcolor: "inherit",
    borderRadius: 2,
    color: "rgb(255, 255, 255)",
    '&:hover': {
        bgcolor: "#674b94"
    },
    '&:focus': {
        bgcolor: "#674b94"
    },
}


export const NavigationBar = ({ user, setSearchTerm, setProfile, searchTerm }) => {
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
                <AppBar className="appbar" position={(scrollPosition > 250) ? "fixed" : "relative"} enableColorOnDark={true} style={{ background: '#4c2c83' }}>
                    <Toolbar>
                        {user &&
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }, buttonStyle}
                            >
                                <HomeIcon onClick={() => setProfile(false)} />
                            </IconButton>
                        }
                        {user &&
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }, buttonStyle }
                            >
                                <AccountCircle onClick={() => setProfile(true)} />
                            </IconButton>
                        }
                        <Typography
                            variant="body1"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            {user ? <span> Welcome! {user.email} </span>
                                : <span>Please <a style={{ cursor: 'pointer', textDecorationLine: 'underline' }}
                                    onClick={signInWithGoogle}> log in </a> to check your posts </span>}
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                value={searchTerm}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(event) => { setSearchTerm(event.target.value) }}
                            />
                        </Search>
                        <Button sx={buttonStyle} onClick={() => setSearchTerm("")}> clear </Button>
                        <SignInOut setProfile={setProfile} />
                    </Toolbar>
                </AppBar>
            </Box>
        </Grow>
    );
}