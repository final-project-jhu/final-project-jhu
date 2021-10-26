import React, { useRef, useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
// import './style.css';
import ErrorMessage from "../ErrorMessage";
import { useTaskContext } from "../../utils/GlobalState";
import API from '../../utils/API';
import refreshUserData from "../../utils/refreshUserData";

function JoinBtn() {
    
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useTaskContext()[1];
  
    const [error, setError] = useState(null);
  
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const inviteRef = useRef();
    const handleClick = () => {
      if (!inviteRef.current.value) {
        setError("Please enter your team invite code.");
        return;
      }
  

      API.joinTeam(inviteRef.current.value)
      .then(() => {
        setError(null);
           refreshUserData(dispatch);
        closeModal();

      })

      .catch(err => {
      
        if (!err.response) {
            setError("Unable to connect to the server.");
        } else if (err.response.status === 401) {
            setError("You are not logged in.");
        } else if (err.response.status === 403) {
               setError("Invalid ivite code.");
        } else {
            setError("An unknown error occurred.");
        }
          console.log(err);
    })

    .catch(err => {
        console.log(err);
      });
  };

    return (
    <>
      <div
        className="modalContainer text-center"
      >
        <Button onClick={openModal} className="arrow-button" >

          <h1><i className="fas fa-arrow-right"></i></h1>
        </Button>
      </div>

      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Join Your Team!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorMessage message={error} />
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Team Code"
              aria-label="modal"
              ref={inviteRef}
            />
        
            {}
          </InputGroup>

        </Modal.Body>

        <Modal.Footer>
          {}
          <Button variant="primary" onClick={handleClick}>
            Join
            </Button>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default JoinBtn;
