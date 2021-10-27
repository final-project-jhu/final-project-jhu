import React, { useRef, useState } from "react";
import {
  Jumbotron,
  InputGroup,
  Toast,
  FormControl,
  Button,
} from "react-bootstrap";
import { useTaskContext } from "../../utils/GlobalState";

import JoinBtn from "../Join/modal";
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
