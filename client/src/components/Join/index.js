import React, { useRef, useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import './style.css';
import ErrorMessage from "../ErrorMessage";
import { useChoreContext } from "../../utils/GlobalState";
import API from '../../utils/API';
import refreshUserData from "../../utils/refreshUserData";