import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import emailjs from '@emailjs/browser';
import swal from 'sweetalert';



//Name, description, photo, location, contact
export default function ShowEmailForm({ toEmail, show, handleClose }) {
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

    const ContactUs = (handleClose) => {
        const toEmail   = document.querySelector('#toEmail').value;
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
        <div>
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Lost or Found Form
                    </Typography>
                    <Stack spacing={spacing}>
                        <TextField id="toEmail" name="toEmail" label="To" variant="outlined" disabled defaultValue={toEmail}/>
                        <TextField id='fromEmail' label="From Email" name='from_email' variant="outlined" required helperText='Must be valid email' error={!validFromEmail} />
                        <TextField id='message' label="Message" name='msg' variant="outlined" required helperText="Cannot be blank" error={!validMessage} />
                        
                    </Stack>
                    <Box textAlign="right">
                        <Button sx={{ mt: spacing }} size="small" variant="outlined" onClick={() => ContactUs(handleClose)}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}