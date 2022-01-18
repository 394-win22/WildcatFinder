import React from 'react';
import { Modal } from 'react-bootstrap';
import bottle from '../imgs/bottle.png';

//Name, description, photo, location, contact
export default function ShowItem({ post, show, handleClose }) {
    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Lost Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h3>Name:</h3>
                        {post?.itemName}
                    </div>
                    <div>
                        <h3>Description:</h3>
                        {post?.description}
                        {/* will need to change to description^ */}
                    </div>
                    <div>
                        <h3>Location:</h3>
                        {post?.location}
                    </div>
                    <div>
                        <h3>Contact:</h3>
                        {post?.contact_info}
                    </div>
                    <img src={post?.img} width="100%" />
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
