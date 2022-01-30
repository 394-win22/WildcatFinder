import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase.js';
import Button from "@mui/material/Button";

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
    const [user] = useUserState();
    console.log(user)
    const SignInButton = () => (
        <Button sx={buttonStyle} onClick={() => signInWithGoogle()}> Sign In </Button>
    );
    
    const SignOutButton = () => (
        <Button sx={buttonStyle} onClick={() => signOut()}> Sign Out </Button>
    );
    return ( 
        <div className ="signInAndOut">
            { user ? <SignOutButton /> : <SignInButton /> }
        </div>);
};

