<<<<<<< HEAD
// import React, { createContext, useContext } from 'react';
// // import { useProductReducer } from './reducers';
=======
import React, { createContext, useReducer, useContext } from "react";
import {
    UPDATE_USERNAME,
    UPDATE_TEAM,
    UPDATE_MEMBERS,
    UPDATE_TASKS,
    UPDATE_TASK,
    ADD_TASK,
    REMOVE_TASK,
    UPDATE_ATTEMPTS,
    COMPLETE_ATTEMPT,
    UNDO_ATTEMPT
>>>>>>> fbe7f24302bb3a0fa42743b69077f090381517d4

} from './actions';

// const TaskContext = createContext();
// const { Provider } = TaskContext;

<<<<<<< HEAD
// const TaskManager = ({ value = [], ...props }) => {
//     const [state, dispatch] = useTaskReducer({
//         tasks: [],
//         members: [],
//         taskCompleted: false,
//     });

//     return <Provider value={[state, dispatch]} {...props} />;

// };
=======
const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_USERNAME:
            return {
                ...state,
                username: action.username,
                userId: action.userId
            }

        case UPDATE_TEAM:
            return {
                ...state,
                team: action.team,
                inviteCode: action.inviteCode
            };

        case UPDATE_MEMBERS:
            return {
                ...state,
                members: action.members
            };


        case UPDATE_TASKS:
            return {
                ...state,
                tasks: action.tasks
            };

        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    return (task.id !== action.id ? task : action.task);
                })
            };

        case ADD_TASK:
            return {
                ...state,
                task: [...state.tasks, action.task],
            };

        case REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => {
                    return task.id !== action.id;
                })
            };

        case UPDATE_ATTEMPTS:
            return {
                ...state,
                attempts: action.attempts
            };

        case COMPLETE_ATTEMPT:
            return {
                ...state,
                attempts: state.attempts.map(attempt => {
                    return (attempt.id !== action.id ? attempt : { ...attempt, complete: true });
                })
            };

        case UNDO_ATTEMPT:
            return {
                ...state,
                attempts: state.attempts.map(attempt => {
                    return (attempt.id !== action.id ? attempt : { ...attempt, complete: false });
                })
            }

        default:
            return state;

    }
}

const TaskProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        members: [],
        tasks: [],
        attempts: []

    });

    return <Provider value={[state, dispatch]} {...props} />
};
>>>>>>> fbe7f24302bb3a0fa42743b69077f090381517d4

// const useTaskContext = () => {
//     return useContext(TaskContext);
// };

<<<<<<< HEAD
// export { TaskManager, useTaskContext };

=======
export { TaskProvider, useTaskContext };
>>>>>>> fbe7f24302bb3a0fa42743b69077f090381517d4
