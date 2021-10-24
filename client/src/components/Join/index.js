import React, { useRef, useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import './style.css';
import ErrorMessage from "../ErrorMessage";
import { useTextContext } from "../../utils/GlobalState";
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