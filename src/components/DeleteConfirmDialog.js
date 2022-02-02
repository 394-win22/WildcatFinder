import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {setData, storage} from "../utilities/firebase";
import { ref as sref, deleteObject } from 'firebase/storage';

export default function DeleteConfirmDialog({idx, open, setOpen, deleteItemName, post}) {
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmClose = () => {
        var fileUrl = post[idx].img;
        
        if(fileUrl !== "https://s2.loli.net/2022/01/12/uc38gRPtJ6QahDI.png"){
            const desertRef = sref(storage, fileUrl);
                deleteObject(desertRef).then(() => {
                //console.log("File deleted successfully");
            }).catch((error) => {
                alert("Uh-oh, an error occurred!");
            });
        }
        setData("/" + idx, null);
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{textAlign:"center"}}>
                    {"Delete it?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{textAlign:"center"}}>
                        Are you sure want to delete {deleteItemName} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmClose} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}