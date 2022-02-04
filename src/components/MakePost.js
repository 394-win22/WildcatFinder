import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { setData, updateData, getRefByPush } from '../utilities/firebase';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack, LinearProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from '../utilities/firebase'
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MapContainer from "./map";

//import TextField from '@mui/material/TextField';
function MakePost({ show, handleClose, posts, isMobile, user }) {
    const spacing = 2;
    const [dateTime, setValueDT] = useState(new Date());
    const [lf, setLF] = useState('Found');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [validName, setValidName] = useState(true);
    const [validLoc, setValidLoc] = useState(true);
    const [validContact, setValidContact] = useState(true);
    const id = getRefByPush('/');
    const [open, setOpen] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);
    const [mapLocation, setMapLocation] = useState("");

    const handleClick = () => {
      setOpen(true);
    };

    const handleLF = (event) => {
        setLF(event.target.value);
    };

    const handleChangeDT = (newValue) => {
        setValueDT(newValue);
    };

    const handleFileChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const Input = styled('input')({
        display: 'none',
    });
    const width = window.innerWidth;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '1' : (width < 1428) ? '.4' : '.3' ,
        height: '1fr',
        maxHeight: '95%', 
        overflow: 'auto',
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleUpload = () => {
        const metaData = {
            contentType: image?.type
        }
        const storageRef = sRef(storage, `images/${id}${image?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image, metaData);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                alert("error: image not uploaded!");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setData("/" + id + "/img", url);
                    setImage(null);
                });
            }
        );
    }

    const handleCloseMessage = () => {
        setOpen(false);
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    const addNewPost = (handleClose) => {
        
        const itemName = document.querySelector('#itemName').value;
        const location =  document.querySelector('#itemLocation').value;

        const description = document.querySelector('#itemDescription').value;
        const contactInfo = document.querySelector('#contactInfo').value;
        // validate

        if (itemName?.length > 0 && location?.length > 0 && contactInfo?.length > 0 && validateEmail(contactInfo)) {
            setData("/" + id + "/itemName", itemName);
            setData("/" + id + "/location", location);
            setData("/" + id + "/description", description);
            const dtStr = dateTime.toString();
            setData("/" + id + "/datetime", dtStr);
            setData("/" + id + "/contact_info", contactInfo);
            setData("/" + id + "/type", lf);
            setData("/" + id + "/user_id", user.email);
            if (image !== null) {
                handleUpload();
            } else {
                setData("/" + id + "/img", "https://s2.loli.net/2022/01/12/uc38gRPtJ6QahDI.png");
            }
            handleClose();
            handleClick();
        }

        setValidContact(contactInfo?.length > 0 && validateEmail(contactInfo));
        setValidLoc(location?.length > 0);
        setValidName(location?.length > 0);
        setMapLocation("");

    }
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    return (
        <div>
            <Modal
                open={show}
                onClose={() => {
                    handleClose();
                    setValidContact(true);
                    setValidLoc(true);
                    setValidName(true);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflow: 'scroll' }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign: "center", marginBottom: 10}}>
                        Lost or Found Form
                    </Typography>
                    <Stack spacing={spacing}>
                        <TextField id="itemName" inputProps={{ maxlength: 30 }} name="name" label="Item Name" variant="outlined" required error={!validName} helperText="Cannot be blank" />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Lost or Found</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={lf}
                                defaultValue='Found'
                                label="Lost or Found"
                                onChange={handleLF}
                            >
                                <MenuItem value={'Lost'}>Lost</MenuItem>
                                <MenuItem value={'Found'}>Found</MenuItem>
                            </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Date Time Picker"
                                value={dateTime}
                                onChange={handleChangeDT}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <Box>
                            <TextField id="itemLocation"
                                        label="Item Location"
                                        variant="outlined"
                                        required
                                        helperText="Cannot be blank"
                                        inputProps={{ maxlength: 50 }}
                                        defaultValue={ mapLocation ? mapLocation : ""}
                                        onChange={e=>{
                                            setMapLocation(e.target.value)
                                        }}
                                        value ={mapLocation}
                                        placeholder= {"Item Location"}
                                        error={!validLoc}
                                        sx={{width: isMobile ? "84%" : "86%"}}/>
                            <IconButton sx={{width: isMobile ? "16%" : "14%"}} color="primary" aria-label="upload picture" component="span">
                                <LocationOnIcon fontSize="large" onClick={() => setMapOpen(true)}/>
                            </IconButton>
                        </Box>

                        <TextField id='itemDescription'
                                   label="Item Description"
                                   name='item_description'
                                   placeholder="Descriptions"
                                   variant="outlined" />

                        <TextField id='contactInfo'
                                   label="Contact Information"
                                   name='contact_info'
                                   defaultValue = { user ? user.email : "" }
                                   placeholder= { user ? user.email : "" }
                                   variant="outlined"
                                   required helperText="Must be valid email"
                                   error={!validContact} />

                        <Box textAlign="center">
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange}/>
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" onChange={handleFileChange}/>
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            <label>{image ? "Successfully upload!" : "Haven't uploaded yet."}</label>
                        </Box>
                    </Stack>
                    <Box textAlign="right" marginTop={2}>
                        <Button sx={{ mt: spacing }} size="small" variant="outlined" onClick={() => {
                            addNewPost(handleClose);
                        }}>
                            Submit
                        </Button>
                        <Button sx={{ mt: spacing, marginLeft: "5%"}} size="small" variant="outlined" onClick={() => handleClose()}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseMessage}>
                <Alert onClose={handleCloseMessage} severity="success" sx={{ width: '100%' }}>
                    Item Posted!
                </Alert>
            </Snackbar>
            <MapContainer mapOpen={mapOpen}
                          setMapOpen={setMapOpen}
                          location={mapLocation}
                          setLocation={setMapLocation}
                          isMobile={isMobile}/>
        </div>
    );
};

export default MakePost;