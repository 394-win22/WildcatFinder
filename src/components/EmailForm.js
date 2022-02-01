import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import emailjs from '@emailjs/browser';
import swal from 'sweetalert';

//Name, description, photo, location, contact
export default function ShowEmailForm({ toEmail, show, handleClose, user }) {
    const [validFromEmail, setValidFromEmail] = useState(true);
    const [validMessage, setValidMessage] = useState(true);
    const spacing = 2;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        backgroundImage: 'url("https://s2.loli.net/2022/02/02/jqObZC6kz7flaGQ.png")',
        backgroundSize: "50% 50%",
        backgroundPosition: 'center', /* Center the image */
        backgroundRepeat: 'no-repeat', /* Do not repeat the image */
        border: '0px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    const ContactUs = (toEmail, handleClose) => {
        const fromEmail = document.querySelector('#fromEmail').value;
        const message   = document.querySelector('#message').value;  
        const params = {
            "to_email": toEmail,
            "from_email": fromEmail,
            "message_html": message,
        };
        
        if (toEmail?.length > 0 && fromEmail?.length > 0 && validateEmail(fromEmail) && message?.length > 0) {
            emailjs.send('service_wildcatFinder', 'wildcatFinder', params, 'user_ishH85RysqiVJXw8CLgcJ')
                .then((result) => {
                    swal("Message received!", "Will Reply Back Soon..", "success");
                }, (error) => {
                    swal("Failed", "Please try again in sometime..", "error");                    
                });
            handleClose()
        }

        setValidFromEmail(fromEmail?.length > 0 && validateEmail(fromEmail));
        setValidMessage(message?.length > 0);
    };
    
    


    return (
        <div className="emailform">
            <Modal
                open={show}
                onClose={() => {
                    handleClose();
                    setValidFromEmail(true);
                    setValidMessage(true);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: 'scroll'}}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign: "center", marginBottom: 10}}>
                        Email Now
                    </Typography>
                    <Stack spacing={spacing}>
                        <TextField id='fromEmail' label="From Email" name='from_email' variant="outlined" defaultValue = {user?user['email']:""} required helperText='Must be valid email' error={!validFromEmail} />
                        <TextField id='message' label="Message" name='msg' variant="outlined" multiline rows={4} placeholder="Provide the description of item" sequired helperText="Cannot be blank" error={!validMessage} />
                        
                    </Stack>
                    <Box textAlign="right">
                        <Button sx={{ mt: spacing }} size="small" variant="outlined" onClick={() => ContactUs(toEmail, handleClose)}>
                            Submit
                        </Button>
                        <Button sx={{ mt: spacing, marginLeft: "5%"}} size="small" variant="outlined" onClick={() => handleClose()}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
