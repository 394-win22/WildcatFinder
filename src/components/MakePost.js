import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import DateTimePicker from '@mui/lab/DateTimePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { setData, updateData, getRefByPush } from '../utilities/firebase';

//import TextField from '@mui/material/TextField';
function MakePost({ show, handleClose, posts }) {
    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

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

    const addNewPost = (handleClose) => {
        const itemName = document.querySelector('#itemName').value;
        const location = document.querySelector('#itemLocation').value;
        const description = document.querySelector('#itemDescription').value;
        const date = document.querySelector('#dateFound').value;
        const time = document.querySelector('#timeFound').value;
        // const type = document.querySelector('#type').value;

        const id = posts.length;

        setData("/" + id + "/itemName", itemName);
        setData("/" + id + "/location", location);
        setData("/" + id + "/description", description);
        setData("/" + id + "/time", time);
        setData("/" + id + "/date", date);
        // setData("/" + id + "/type", type);

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
            <Modal animation={false} show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Found Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>
                            <h4>Item Name: </h4>
                            <input type="text" id='itemName' name="name" />
                        </div>
                        <div>
                            <h4>Date and time found: </h4>
                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> 
                                    <DateTimePicker
                                            label="Date Time Picker"
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                </LocalizationProvider> */}

                            <input type="date" id="dateFound" name="date_found" />
                            <input type="time" id="timeFound" name="time_found" />
                        </div>

                        <div>
                            <h4>Current Item Location: </h4>
                            <input type="text" id='itemLocation' />
                        </div>
                        <div>
                            <h4>Item Description: </h4>
                            <input type='text' id='itemDescription' name='item_description' />
                        </div>
                        {/* <div class="container">
                            <input type="file" id="image_input" accept="image/png, image/jpg"/>
                            <div id="display_image"></div>
                        </div> */}
                        {/* <div>
                            <h4>
                                <label for="left-item"> I left the item where I found it.  </label>
                                <input type="checkbox" id="left-item" name="left-item" value="LeftItem" />
                            </h4>
                        </div>
                        
                        <div>
                            <h4>
                                <label for="found-item"> I took the item with me.  </label>
                                <input type="checkbox" id="took-item" name="took-item" value="TookItem" />
                            </h4> 
                        </div> */}

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-secondary' onClick={() => addNewPost(handleClose)}>
                        Submit
                    </button>
                </Modal.Footer>
            </Modal>

        </div>
    )
};

export default MakePost;