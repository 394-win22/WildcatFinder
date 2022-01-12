import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function MakePost ({ show, handleClose }){

    return (
        <div>
            <Modal animation={false} show ={show} onHide = {handleClose}>
                <Modal.Header>
                    <Modal.Title>Found Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>
                            <h4>Name: </h4>
                            <input type="text" name="name" />
                        </div>
                        <div>
                            <h4>Date found: </h4>
                            <input type="date" id="date_found" name="date_found"/>
                        </div>
                        <div>
                            <h4>Time found: </h4>
                            <input type="time" id="time_found" name="time_found"/>
                        </div>
                        <div>
                            <h4>Location item was found: </h4>
                            <input type="text" lastseen="tech" />
                        </div>
                        <div>
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
                        </div>
                        
                        <input type="submit" value="Submit"  />

                        
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-secondary' onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

        </div>
    )
};

export default MakePost;