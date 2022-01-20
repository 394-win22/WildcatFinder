import Modal from '@mui/material/Modal';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import emailjs from '@emailjs/browser';



//Name, description, photo, location, contact
export default function ShowEmailForm({ toEmail, show, handleClose }) {
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


    const ContactUs = (handleClose) => {
        const toEmail = "sathu.sathvik@gmail.com" //document.querySelector('#to_email').value;
        const fromEmail = document.querySelector('#fromEmail').value;
        const message = document.querySelector('#message').value;  
        const params = {
            "to_email": toEmail,
            "from_email": fromEmail,
            "message_html": message,
        };
        // const payload = {
        //     service_id: 'service_wildcatFinder',
        //     template_id: 'wildcatFinder',
        //     user_id: 'sathviksathu',
        //     template_params: params,
        // };
        
        emailjs.send('service_wildcatFinder', 'wildcatFinder', params, 'user_ishH85RysqiVJXw8CLgcJ')
            .then((result) => {
                
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
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
                        <TextField id='fromEmail' label="From Email" name='from_email' variant="outlined" required/>
                        <TextField id='message' label="Message" name='msg' variant="outlined" required helperText="Cannot be blank" />
                        
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
