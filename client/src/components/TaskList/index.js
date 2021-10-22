import React, { useEffect, useState } from "react";
import Repetitions from "../Repetitions";
import { Tabs, Tab } from 'react-bootstrap';
import './style.css';
import { useTaskContext } from "../../utils/GlobalState";
import { UPDATE_REPETITIONS } from "../../utils/actions";
import API from "../../utils/API";
import { Container } from "react-bootstrap";


function TaskList() {

  const [state, dispatch] = useTaskContext();
  const [filteredReps, setFilteredReps] = useState([]);

  const loadRepetitions = () => {

    API.getAllRepetitions()
      .then(res => {
        dispatch({ type: UPDATE_REPETITIONS, repetitions: res.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: UPDATE_REPETITIONS, repetitions: [] });
      });
  }

  const setCompleted = (repId, complete) => {
    API.completeRepetition(repId, complete)
      .then(res => {
        loadRepetitions();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadRepetitions();
  }, []);


  useEffect(() => {
    const tempFilteredReps = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const usedTasks = {};

    for (let i = 0; i < state.repetitions.length; i++) {
   
      if (!usedTasks[state.repetitions[i].TaskId]) {
   
        let dueDate = new Date(state.repetitions[i].due_date);
        if (dueDate >= today) {
          tempFilteredReps.push(state.repetitions[i]);
          usedTasks[state.repetitions[i].TaskId] = true;
        }
      }
    }

    setFilteredReps(tempFilteredReps);
  }, [state.repetitions]);

  return (
    <Container style={{ marginBottom: 25 }} >
      <div className=" border rounded" >
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Your Assigned Tasks">
            <UserReps onComplete={setCompleted} reps={filteredReps} />
          </Tab>
          <Tab eventKey="profile" title="Team Tasks">
            <TeamReps onComplete={setCompleted} reps={filteredReps} />
          </Tab>
        </Tabs>
      </div>
    </Container>

  );
}

function TeamReps(props) {
  return (
    <Repetitions reps={props.reps} onComplete={props.onComplete} />
  );
}

function UserReps(props) {
  const [state, dispatch] = useTaskContext();
  return (
    <Repetitions reps={props.reps.filter((repetition) => repetition.UserId === state.userId)} onComplete={props.onComplete} />
  );
}

export default TaskList;