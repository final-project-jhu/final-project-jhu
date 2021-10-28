import React, { useEffect, useState } from "react";
import Attempts from "../Attempts";
import { Tabs, Tab } from 'react-bootstrap';
import './style.css';
import { useTaskContext } from "../../utils/GlobalState";
import { UPDATE_ATTEMPTS } from "../../utils/actions";
import { COMPLETE_ATTEMPT } from "../../utils/actions";
import { REMOVE_TASK } from "../../utils/actions";
import { Container } from "react-bootstrap";
import { idbPromise } from "../../utils/helpers";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from "../../utils/queries";



function TaskList() {

  const [state, dispatch] = useTaskContext();
  const { id } = useParams();

  const [currentAttempt, setCurrentAttempt] = useState([]);
  const [filteredReps, setFilteredReps] = useState([]);

  const { loading, data } = useQuery(UPDATE_ATTEMPTS);

  const { attempts, tasks } = state;


  useEffect(() => {
   if (attempts.length){
       setCurrentAttempt(attempts.find((task) => task.id === id));
   }
   else if (data){
       dispatch({
           type: UPDATE_ATTEMPTS,
           tasks: data.attempts,
       });

       data.attempts.forEach((task) => {
           idbPromise('tasks', 'put', task);
       });
   }
   else if (!loading) {
       idbPromise('tasks', 'get').then((indexedTasks) => {
           dispatch({
               type: UPDATE_ATTEMPTS,
               tasks: indexedTasks
           });
       });
   }
  }, [tasks, data, attempts, loading, dispatch, id]);


  const setCompleted = () => {

    const completeAttempt = attempts.find((attempt) => attempt._id === id);
    if (completeAttempt) {
        dispatch({
            type: COMPLETE_ATTEMPT,
            _id: id,
        });
        idbPromise('attempt', 'put', {
            ...completeAttempt,
        });
    } 
    else {
        dispatch({
            type: UPDATE_ATTEMPTS,
        });
        idbPromise('attempt', 'put', ...currentAttempt)
    }
  };

 
//   const removeTask = () => {
//     dispatch({
//       type: REMOVE_TASK,
//       _id: currentAttempt._id,
//     });

//     idbPromise('task', 'delete', { ...currentAttempt });
//   };

  useEffect(() => {
    const tempFilteredReps = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const usedTasks = {};

    for (let i = 0; i < state.attempts.length; i++) {
   
      if (!usedTasks[state.attempts[i].TaskId]) {
   
        let dueDate = new Date(state.attempts[i].due_date);
        if (dueDate >= today) {
          tempFilteredReps.push(state.attempts[i]);
          usedTasks[state.attempts[i].TaskId] = true;
        }
      }
    }

    setFilteredReps(tempFilteredReps);
  }, [state.attempts]);

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
    <Attempts reps={props.reps} onComplete={props.onComplete} />
  );
}

function UserReps(props) {
    // dispatch({
    //     type: QUERY_USER,

    // })
  const [state, dispatch] = useTaskContext();
  return (
    <Attempts reps={props.reps.filter((attempt) => attempt.UserId === state.userId)} onComplete={props.onComplete} />
  );
}

export default TaskList;
