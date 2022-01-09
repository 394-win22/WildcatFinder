import React from 'react';
import { Modal } from 'react-bootstrap';
import bottle from '../imgs/bottle.png';

//Name, description, photo, location, contact
export default function ShowItem({itemName, description, photo, location, contactInfo, show,handleClose}) {
    
    return (
        <div>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header>
                        <Modal.Title>Lost Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <div>
                                <h3>Name:</h3>
                                {itemName}
                            </div>
                            <div>
                                <h3>Description:</h3>
                                {description}
                            </div>
                            <div>
                                <h3>Location:</h3>
                                {location}
                            </div>
                            <div>
                                <h3>Contact:</h3>
                                {contactInfo}
                            </div>
                        </>
                    </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-secondary' onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
