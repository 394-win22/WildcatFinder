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
    width: 1,
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

export const SignInOut = ({setProfile}) => {
    const [user] = useUserState();
    const [open, setOpen] = useState(false);
    const [signInPressed, setSignInPressed] = useState();
    const [signOutPressed, setSignOutPressed] = useState();

    const handleClose = () => {
        setOpen(false);
    }

    const SignIn = () => {
        setOpen(true);
        signInWithGoogle();
        setSignInPressed(true);
        setSignOutPressed(false);
    }

    const SignOut = () => {
        setOpen(true);
        setProfile(false);
        signOut();
        setSignOutPressed(true);
        setSignInPressed(false);
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

    const SignInButton = () => (
        <Button sx={buttonStyle} onClick={() => SignIn()}> Login </Button>
        
    );
    
    const SignOutButton = () => (
        <Button sx={buttonStyle} onClick={() => SignOut()}> Logout </Button>
       
    );

    return ( 
        <div className ="signInAndOut">
            { user ? <SignOutButton /> : <SignInButton /> }
            { signInPressed && user ? <Welcome/> : <div />}
            { signOutPressed ? <Bye/> : <div />}
        </div>);
};

