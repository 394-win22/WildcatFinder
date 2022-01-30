import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase.js';
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const buttonStyle = {
    mx: 2,
    width: 1 / 14,
    margin: '1%',
    bgcolor: "rgba(28,133,255,0.95)",
    borderRadius: 2,
    color: "rgb(255, 255, 255)",
    '&:hover': {
      bgcolor: "rgba(129,182,239,0.95)"
    },
    '&:focus': {
      bgcolor: "rgba(129,182,239,0.95)"
    },
  }

export const SignInOut = () => {
    const handleClose = () => {
        setOpen(false);
    }

    const SignIn = () => {
        setOpen(true);
        setStatus(true);
        signInWithGoogle();
    }

    const SignOut = () => {
        setOpen(true);
        setStatus(false);
        signOut();
    }

    const Welcome = () => {
        return(
            <Snackbar open={open}
                      autoHideDuration={3000}
                      onClose={handleClose}
                      anchorOrigin={{horizontal: "center", vertical:"top"}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Welcome to WildcatFinder!
                </Alert>
            </Snackbar>
        )
    }

    const Bye = () => {
        return(
            <Snackbar open={open}
                      autoHideDuration={3000}
                      onClose={handleClose}
                      anchorOrigin={{horizontal: "center", vertical:"top"}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Bye, hope to see you again!
                </Alert>
            </Snackbar>
        )
    }

    const [user] = useUserState();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState();

    const SignInButton = () => (
        <Button sx={buttonStyle} onClick={() => SignIn()}> Sign In </Button>
    );
    
    const SignOutButton = () => (
        <Button sx={buttonStyle} onClick={() => SignOut()}> Sign Out </Button>
    );

    return ( 
        <div className ="signInAndOut">
            { user ? <SignOutButton /> : <SignInButton /> }
            { status ? <Welcome /> : <Bye />}
        </div>);
};

