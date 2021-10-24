import React, { useRef, useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import './style.css';
import ErrorMessage from "../ErrorMessage";
import { useChoreContext } from "../../utils/GlobalState";
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
  