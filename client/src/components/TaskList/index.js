// import React, { useEffect, useState } from "react";
// import Attempts from "../Attempts";
// import { Tabs, Tab } from 'react-bootstrap';
// import './style.css';
// import { useTaskContext } from "../../utils/GlobalState";
// import { UPDATE_ATTEMPTS } from "../../utils/actions";
// import { Container } from "react-bootstrap";


// function TaskList() {

//   const [state, dispatch] = useTaskContext();
//   const [filteredReps, setFilteredReps] = useState([]);

//   const loadAttempts = () => {

//     API.getAllAttempts()
//       .then(res => {
//         dispatch({ type: UPDATE_ATTEMPTS, attempts: res.data });
//       })
//       .catch(err => {
//         console.log(err);
//         dispatch({ type: UPDATE_ATTEMPTS, attempts: [] });
//       });
//   }

//   const setCompleted = (repId, complete) => {
//     API.completeAttempt(repId, complete)
//       .then(res => {
//         loadAttempts();
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     loadAttempts();
//   }, []);


//   useEffect(() => {
//     const tempFilteredReps = [];
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); 
//     const usedTasks = {};

//     for (let i = 0; i < state.attempts.length; i++) {
   
//       if (!usedTasks[state.attempts[i].TaskId]) {
   
//         let dueDate = new Date(state.attempts[i].due_date);
//         if (dueDate >= today) {
//           tempFilteredReps.push(state.attempts[i]);
//           usedTasks[state.attempts[i].TaskId] = true;
//         }
//       }
//     }

//     setFilteredReps(tempFilteredReps);
//   }, [state.attempts]);

//   return (
//     <Container style={{ marginBottom: 25 }} >
//       <div className=" border rounded" >
//         <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
//           <Tab eventKey="home" title="Your Assigned Tasks">
//             <UserReps onComplete={setCompleted} reps={filteredReps} />
//           </Tab>
//           <Tab eventKey="profile" title="Team Tasks">
//             <TeamReps onComplete={setCompleted} reps={filteredReps} />
//           </Tab>
//         </Tabs>
//       </div>
//     </Container>

//   );
// }

// function TeamReps(props) {
//   return (
//     <Attempts reps={props.reps} onComplete={props.onComplete} />
//   );
// }

// function UserReps(props) {
//   const [state, dispatch] = useTaskContext();
//   return (
//     <Attempts reps={props.reps.filter((attempt) => attempt.UserId === state.userId)} onComplete={props.onComplete} />
//   );
// }

// export default TaskList;
