import React from 'react';
import Modal from '@mui/material/Modal';
// import { Modal } from 'react-bootstrap';
import Typography from "@mui/material/Typography";
import { Box, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';

//Name, description, photo, location, contact
export default function ShowItem({ post, show, handleClose }) {
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

    return (
        <div>
            <Modal
                open={show}
                onClose={() => {
                    handleClose();
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: 'scroll' }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign: "center", marginBottom: 10}}>
                        Details of Lost Items
                    </Typography>
                    <Stack spacing={2}>
{/*                         <Typography id="modal-modal-title" variant="subtitle1" component="h1">
                            Name of Item. 
                        </Typography>
                        <TextField  id="filled-read-only-input"
                                    label="Name"
                                    defaultValue= {post?.itemName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled" /> */}

                        <Typography id="modal-modal-title" variant="subtitle1" component="h1">
                            Description
                        </Typography>
                        <TextField  id="filled-read-only-input"
                                    defaultValue= {post?.description}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled" />

                        {/* <Typography id="modal-modal-title" variant="subtitle1" component="h1">
                            Location
                        </Typography>
                        <TextField  id="filled-read-only-input"
                                    label="Location"
                                    defaultValue= {post?.location}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled" />

                        <Typography id="modal-modal-title" variant="subtitle1" component="h1">
                            Contact Information
                        </Typography>
                        <TextField  id="filled-read-only-input"
                                    label="Contact"
                                    defaultValue= {post?.contact_info}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled" /> */}
{/*                         <img alt="ItemsImage" src={post?.img} width="100%" /> */}
                    </Stack>
                    <Box textAlign="right">
                        <Button sx={{ mt: 2, marginLeft: "5%"}} size="small" variant="outlined" onClick={() => handleClose()}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
