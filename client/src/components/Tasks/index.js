<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useTaskContext } from "../../utils/GlobalState";
import { UPDATE_TASKS, UPDATE_MEMBERS } from "../../utils/actions";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../utils/API";
import DatePicker from "react-datepicker";

import "./style.css";

const RepeatedDays = ({ repeatedDays, onToggleDay }) => {
  return (
    <div className="row">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
        <div className="col-auto px-2">
          {day}
          <input
            type="checkbox"
            checked={repeatedDays[i]}
            onChange={(e) => onToggleDay(i, e.target.checked)}
          />
        </div>
      ))}
    </div>
  );
};

const formatDate = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  return new Date(timestamp).toDateString();
};

const Tasks = () => {
  const [state, dispatch] = useTaskContext();

  const [dueDate, setDueDate] = useState(new Date());
  const [taskName, setTaskName] = useState("");
  const [assignedId, setAssignedId] = useState("");
  const [repeated, setRepeated] = useState(false);
  const [repeatedDays, setRepeatedDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const addTask = () => {
    API.createTask(taskName, repeated, repeatedDays, dueDate, assignedId).then(
      () => {
        loadTasks();
        console.log("Success! Task created.");
        setTaskName("");
        setRepeated(false);
        setRepeatedDays([false, false, false, false, false, false, false]);
      }
    );
  };

  const removeTask = (TaskId) => {
    API.removeTask(TaskId).then(() => loadTasks());
  };
  
  const toggleDay = (day, checked) => {
    const newRepeatedDays = repeatedDays.slice();
    newRepeatedDays[day] = checked;
    setRepeatedDays(newRepeatedDays);
  };

  const loadTasks = () => {
    API.getAllTeamTasks()
      .then((res) => {
        dispatch({ type: UPDATE_TASKS, tasks: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: UPDATE_TASKS, tasks: [] });
      });
  };

  useEffect(() => {
    API.getMembers()
      .then((res) => {
        dispatch({ type: UPDATE_MEMBERS, members: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: UPDATE_MEMBERS, members: [] });
      });
  }, [dispatch]);

  console.log(state.tasks);

  return (
    <Container style={{ marginTop: 20 }}>
      <h1>Task Management</h1>
      <Table bordered hover>
        <thead>
          <tr className="tr-heared">
            <th>Assigned Task</th>
            <th>Attempts</th>
            <th>Due by</th>
            <th>Assigned to</th>
            <th>Save</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className="form-control"
                placeholder="Add task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </td>
            <td style={{ width: "125px" }}>
              <input
                type="checkbox"
                checked={repeated}
                onChange={(e) => setRepeated(e.target.checked)}
              />
            </td>
            <td style={{ width: "350px" }}>
              {repeated ? (
                <RepeatedDays
                  repeatedDays={repeatedDays}
                  onToggleDay={toggleDay}
                />
              ) : (
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                />
              )}
            </td>
            <td>
              <select
                className="form-control"
                onChange={(e) => setAssignedId(e.target.value)}
              >
                <option value="">Select a team member</option>
                {state.members.map((member, i) => (
                  <option value={member.id} key={i}>
                    {member.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button className="btn btn-primary" onClick={addTask}>
                Add
              </button>
            </td>
          </tr>
          {state.tasks.map((task, i) => {
            const user = state.members.find((user) => user.id === task.UserId);
            return (
              <tr key={i}>
                <td>{task.task}</td>
                <td>{task.repeats ? "Yes" : "No"}</td>
                <td>
                  {task.repeats
                    ? ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
                        .filter((day, i) => task.repeated_days[i])
                        .join(", ")
                    : formatDate(task.Attempts[0]?.due_date)}
                </td>
                <td>{user?.name}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTask(task.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Tasks;
=======
// import React, { useState, useEffect } from 'react';
// import { Table, Container } from 'react-bootstrap';
// import { useTaskContext } from "../../utils/GlobalState";
// import { UPDATE_TASKS, UPDATE_MEMBERS } from "../../utils/actions";
// import "react-datepicker/dist/react-datepicker.css";
// import API from "../../utils/API";
// import DatePicker from "react-datepicker";

// import "./style.css";




// const RepeatedDays = ({ repeatedDays, onToggleDay }) => {

//     return (
//         <div className="row">
//             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => <div className="col-auto px-2">{day}<input type="checkbox" checked={repeatedDays[i]} onChange={(e) => onToggleDay(i, e.target.checked)} /></div>)}
//         </div>
//     );
// }

// const formatDate = (timestamp) => {
//     if (!timestamp) {
//         return "";
//     }
//     return (new Date(timestamp)).toDateString();
// }

// const Tasks = () => {
//     const [state, dispatch] = useTaskContext();

//     const [dueDate, setDueDate] = useState(new Date());
//     const [taskName, setTaskName] = useState("");
//     const [assignedId, setAssignedId] = useState("");
//     const [repeated, setRepeated] = useState(false);
//     const [repeatedDays, setRepeatedDays] = useState([false, false, false, false, false, false, false]);

//     const addTask = () => {
//         API.createTask(taskName, repeated, repeatedDays, dueDate, assignedId)
//             .then(() => {
//                 loadTasks()
//                 console.log("Success! Task created.");
//                 setTaskName("");
//                 setRepeated(false);
//                 setRepeatedDays([false, false, false, false, false, false, false]);
//             });
//     };

//     const removeTask = (TaskId) => {
//         API.removeTask(TaskId).then(() => loadTasks());
//     }
//     //
//     const toggleDay = (day, checked) => {
//         const newRepeatedDays = repeatedDays.slice();
//         newRepeatedDays[day] = checked;
//         setRepeatedDays(newRepeatedDays);
//     };

//     const loadTasks = () => {
//         API.getAllTeamTasks()
//             .then(res => {
//                 dispatch({ type: UPDATE_TASKS, tasks: res.data });
//             })
//             .catch(err => {
//                 console.log(err);
//                 dispatch({ type: UPDATE_TASKS, tasks: [] });
//             });
//     };

//     useEffect(() => {
//         API.getMembers()
//             .then((res) => {
//                 dispatch({ type: UPDATE_MEMBERS, members: res.data });
//             })
//             .catch(err => {
//                 console.log(err);
//                 dispatch({ type: UPDATE_MEMBERS, members: [] });
//             });
//     }, [dispatch]);

//     console.log(state.tasks)

//     return (
//         <Container style={{ marginTop: 20 }}>
//             <h1>Task Management</h1>
//             <Table bordered hover>
//                 <thead>
//                     <tr className="tr-heared">
//                         <th>Assigned Task</th>
//                         <th>Attempts</th>
//                         <th>Due by</th>
//                         <th>Assigned to</th>
//                         <th>Save</th>
//                     </tr>
//                 </thead>
//                 <tbody >
//                     <tr>
//                         <td><input className="form-control" placeholder="Add task" value={taskName} onChange={(e) => setTaskName(e.target.value)} /></td>
//                         <td style={{ width: "125px" }}><input type="checkbox" checked={repeated} onChange={(e) => setRepeated(e.target.checked)} /></td>
//                         <td style={{ width: "350px" }}>{
//                             repeated
//                                 ? <RepeatedDays repeatedDays={repeatedDays} onToggleDay={toggleDay} />
//                                 : <DatePicker selected={dueDate} onChange={date => setDueDate(date)} />
//                         }</td>
//                         <td>
//                             <select className="form-control" onChange={(e) => setAssignedId(e.target.value)}>
//                                 <option value="">Select a team member</option>
//                                 {state.members.map((member, i) => <option value={member.id} key={i}>{member.name}</option>)}
//                             </select>
//                         </td>
//                         <td><button className="btn btn-primary" onClick={addTask}>Add</button></td>
//                     </tr>
//                     {state.tasks.map((task, i) => {
//                         const user = state.members.find((user) => user.id === task.UserId);
//                         return (
//                             <tr key={i}>
//                                 <td>{task.task}</td>
//                                 <td>{task.repeats ? "Yes" : "No"}</td>
//                                 <td>{
//                                     task.repeats
//                                         ? ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"].filter((day, i) => task.repeated_days[i]).join(', ')
//                                         : formatDate(task.Attempts[0]?.due_date)
//                                 }</td>
//                                 <td>{user?.name}</td>
//                                 <td><button className="btn btn-danger" onClick={() => removeTask(task.id)}>X</button></td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default Tasks;
>>>>>>> 25faa8b4a163431e9c4babdc6f17ec5d2bccd37d
