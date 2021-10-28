import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

// import ErrorMessage from "../ErrorMessage";
import { Card } from "react-bootstrap";
import { TwitterPicker } from "react-color";

function SignUp(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        color: color.hex,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const [color, setColor] = useState({hex: "#22194D"});

  const handleColorChange = (color) => { console.log(color); setColor(color); }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <Card className="text-white rounded-0" style={{ margin: "0px" }}>
        <Card.Img src={process.env.PUBLIC_URL + "../public/images/task"} alt="Card image" />
        <Card.ImgOverlay className="rounded-0">
          {/* <Card.Text> */}
          <Card
            body
            style={{
              opacity: 0.9,
              marginTop: "70px",
              marginLeft: "100px",
              marginRight: "100px",
            }}
          >
            <h2>Signup</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="flex-row space-between my-2">
                <label htmlFor="firstName">First Name:</label>
                <input
                  placeholder="First"
                  name="firstName"
                  type="firstName"
                  id="firstName"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  placeholder="Last"
                  name="lastName"
                  type="lastName"
                  id="lastName"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="email">Email:</label>
                <input
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-row space-between my-2">
                <label htmlFor="pwd">Password:</label>
                <input
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-row flex-end">
                <button type="submit"> Submit</button>
              </div>
              <div className="form-group">
                <label htmlFor="inputName">Your Display add Color</label>
                <TwitterPicker
                  color={color}
                  placeholder="color"
                  name="color"
                  type="color"
                  id="id"
                  onChangeComplete={handleColorChange}
                />

                <small id="nameHelp" className="form-text text-muted">
                  This is your specifc calendar color for assigned tasks.
                </small>
              </div>
            </form>
          </Card>
          {/* </Card.Text> */}
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}

export default SignUp;

