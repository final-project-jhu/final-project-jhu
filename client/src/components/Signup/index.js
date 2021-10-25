import React, { useRef, useState } from 'react';
import "./Signup.css";

import ErrorMessage from "../ErrorMessage";
import API from "../../utils/API";
import { Card } from 'react-bootstrap';

import refreshUserData from "../../utils/refreshUserData";
import { useTaskContext } from "../../utils/GlobalState";

import { TwitterPicker } from "react-color";

function SignUpForm() {
    const [color, setColor] = useState();

    const handleChange = color => setColor(color);

    const dispatch = useTaskContext()[1];

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();

        if (!nameRef.current.value || !emailRef.current.value || !passwordRef.current.value) {

            setError("Required field is missing.");
            passwordRef.current.value = "";
            return;
        }

        API.signup(nameRef.current.value, emailRef.current.value, passwordRef.current.value, color.hex)
            .then(response => {
                setError(null);

                console.log(response);
                refreshUserData(dispatch);
            })
            .catch(err => {
                if (!err.response) {
                    setError("Cannot connect to server.");
                } else if (err.response.data === "SequelizeValidationError") {
                    setError("Please enter a valid email address.");
                } else if (err.response.data === "SequelizeUniqueConstraintError") {
                    setError("Email address already exists.");
                } else {
                    setError("An unknown error occurred.");
                }
                passwordRef.current.value = "";
                console.log(err);
            })
    }

    return (

        <Card className="text-white rounded-0" style={{ margin: '0px' }}>
            <Card.Img src={process.env.PUBLIC_URL + "/img/hero-img.jpg"} alt="Card image" />
            <Card.ImgOverlay className="rounded-0">
                {/* <Card.Text> */}
                <Card body style={{ opacity: 0.9, marginTop: '70px', marginLeft: '100px', marginRight: '100px' }}>
                    <form className="mt-3 rounded">


                        <ErrorMessage message={error} />
                        <div className="form-group">
                            <label htmlFor="inputName">Your Display Name</label>
                            <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp" ref={nameRef} />
                            <small id="nameHelp" className="form-text text-muted">Team members can see your name.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputName">Your Displagit add .y Color</label>
                            <TwitterPicker color={color} onChangeComplete={handleChange} />

                            <small id="nameHelp" className="form-text text-muted">This is your specifc calendar color for assigned tasks.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email Address</label>
                            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" ref={emailRef} />
                            <small id="emailHelp" className="form-text text-muted">This will be your login ID.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Please Create Your Password</label>
                            <input type="password" className="form-control" id="inputPassword" ref={passwordRef} />
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">I Agree to [NAME] Terms and Conditions</label>
                        </div>
                        <button type="button ml-2" className="btn btn-success" onClick={event => handleSubmit(event)}>Submit</button>
                    </form>
                </Card >
                {/* </Card.Text> */}
            </Card.ImgOverlay>
        </Card>

    );
}

export default SignUpForm;