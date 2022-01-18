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
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ref as sRef, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from '../utilities/firebase'

//import TextField from '@mui/material/TextField';
function MakePost({ show, handleClose, posts }) {
    const spacing = 2;
    const [dateTime, setValueDT] = useState(new Date());
    const [lf, setLF] = React.useState('found');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const id = posts.length;

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

    console.log("image: ", image);

    // const createPost = async (post) => {
    //     try {
    //         const postRef = getRefByPush(`/post`);
    //         const postKey = postRef.key;
    //         post = ({ ...post, 'id': postKey });
    //         await updateData(postRef, post);


    //     } catch (error) {
    //         alert(error);
    //     }
    // }
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

    const handleUpload = () => {
        const metaData = {
            contentType: image.type
        }
        const storageRef = sRef(storage, `images/${image.name}`);
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
                    setUrl(url);
                    setData("/" + id + "/img", url);
                });
            }
        );
    }

    const addNewPost = (handleClose) => {
        const itemName = document.querySelector('#itemName').value;
        const location = document.querySelector('#itemLocation').value;
        const description = document.querySelector('#itemDescription').value;
        const contactInfo = document.querySelector('#contactInfo').value;
        // const date = document.querySelector('#dateFound').value;
        // const time = document.querySelector('#timeFound').value;
        // const type = document.querySelector('#type').value;
        //console.log(itemName, location, description, dateTime.toString(), contactInfo, lf);
        setData("/" + id + "/itemName", itemName);
        setData("/" + id + "/location", location);
        setData("/" + id + "/description", description);
        // setData("/" + id + "/time", time);
        // setData("/" + id + "/date", date);
        const dtStr = dateTime.toString();
        setData("/" + id + "/datetime", dtStr);
        setData("/" + id + "/contact_info", contactInfo);
        setData("/" + id + "/type", lf);
        handleUpload();

        //validations
        //     const post = {
        //         "description": description,
        //         "item": itemName,
        //         "date": date
        //     }
        //     createPost(post);
        //     handleClose();
    }
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
                        <TextField id="itemName" name="name" label="Item Name" variant="outlined" />
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
                        <TextField id="itemLocation" label="Item Location" variant="outlined" />
                        <TextField id='itemDescription' label="Item Description" name='item_description' variant="outlined" />
                        <TextField id='contactInfo' label="Contact Information" name='contact_info' variant="outlined" />
                        <input type="file" id="image_input" accept="image/png, image/jpg" onChange={handleFileChange} />
                    </Stack>
                    <Box textAlign="right">
                        <Button sx={{ mt: spacing }} size="small" variant="outlined" onClick={() => addNewPost(handleClose)}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );

    // return (
    //     <div>
    //         <Modal animation={false} show={show} onHide={handleClose}>
    //             <Modal.Header>
    //                 <Modal.Title>Found Item</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <form>
    //                     <div>
    //                         <h4>Item Name: </h4>
    //                         <input type="text" id='itemName' name="name" />
    //                     </div>
    //                     <div>
    //                         <h4>Date and time found: </h4>
    //                         {/* <LocalizationProvider dateAdapter={AdapterDateFns}> 
    //                                 <DateTimePicker
    //                                         label="Date Time Picker"
    //                                         value={value}
    //                                         onChange={handleChange}
    //                                         renderInput={(params) => <TextField {...params} />}
    //                                     />
    //                             </LocalizationProvider> */}

    //                         <input type="date" id="dateFound" name="date_found" />
    //                         <input type="time" id="timeFound" name="time_found" />
    //                     </div>

    //                     <div>
    //                         <h4>Current Item Location: </h4>
    //                         <input type="text" id='itemLocation' />
    //                     </div>
    //                     <div>
    //                         <h4>Item Description: </h4>
    //                         <input type='text' id='itemDescription' name='item_description' />
    //                     </div>
    //                     {/* <div class="container">
    //                         <input type="file" id="image_input" accept="image/png, image/jpg"/>
    //                         <div id="display_image"></div>
    //                     </div> */}
    //                     {/* <div>
    //                         <h4>
    //                             <label for="left-item"> I left the item where I found it.  </label>
    //                             <input type="checkbox" id="left-item" name="left-item" value="LeftItem" />
    //                         </h4>
    //                     </div>

    //                     <div>
    //                         <h4>
    //                             <label for="found-item"> I took the item with me.  </label>
    //                             <input type="checkbox" id="took-item" name="took-item" value="TookItem" />
    //                         </h4> 
    //                     </div> */}

    //                 </form>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <button className='btn btn-secondary' onClick={() => addNewPost(handleClose)}>
    //                     Submit
    //                 </button>
    //             </Modal.Footer>
    //         </Modal>

    //     </div>
    // )
};

export default MakePost;