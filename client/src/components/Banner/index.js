import React, { useRef, useState } from "react";
import {
  Jumbotron,
  InputGroup,
  Toast,
  FormControl,
  Button,
} from "react-bootstrap";
import { useTaskContext } from "../../utils/GlobalState";

<<<<<<< HEAD
import JoinBtn from "../Join/modal";
=======
// import JoinBtn from "../Join/modal"; 
>>>>>>> 25faa8b4a163431e9c4babdc6f17ec5d2bccd37d
import "./Banner.css";

function Code() {
  const state = useTaskContext()[0];
  const textAreaRef = useRef(null);
  const [show, setShow] = useState(false);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setShow(true);
  }

  return (
    <Jumbotron>
      <h1>
        {" "}
        {state.team}{" "}
        <span className="icon">
          <i className="fas fa-home-user"></i>
        </span>
      </h1>
      <div>
        <br />

        <InputGroup className="mb-3 w-50 mx-auto" id="header-title">
          <InputGroup.Prepend></InputGroup.Prepend>
          <FormControl
            readOnly
            ref={textAreaRef}
            value={state.inviteCode}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />

          {document.queryCommandSupported("copy") && (
            <div>
              <Button onClick={copyToClipboard} style={{ marginLeft: 5 }}>
                Copy
              </Button>

<<<<<<< HEAD
              <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={3000}
                autohide
                className="position-absolute"
                style={{ right: -22, marginTop: 10 }}
              >
                <Toast.Body>Code copied!</Toast.Body>
              </Toast>
=======
                {/* <JoinBtn /> */}
                <h5 className="join-team" >Join a new Team</h5>
                <br />
                <h2 className="members-header" >Members</h2>
>>>>>>> 25faa8b4a163431e9c4babdc6f17ec5d2bccd37d
            </div>
          )}
        </InputGroup>

        <JoinBtn />
        <h5 className="join-team">Join a new Team</h5>
        <br />
        <h2 className="members-header">Members</h2>
      </div>
    </Jumbotron>
  );
}

export default Code;
