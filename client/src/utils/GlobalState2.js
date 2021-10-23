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

} from './actions';

const TaskContext = createContext();
const { Provider } = TaskContext;

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
                chores: action.tasks
            };
        
        case UPDATE_TASK:
            return {
                ...state,
                chores: state.tasks.map(task => {
                    return (tasks.id !== action.id ? chore : action.tasks);
                })
            };

        case ADD_TASK:
            return {
                ...state,
                task: [...state.chores, action.task],
            };
            
        case REMOVE_TASK:
            return {
                ...state,
                tasks: state.chores.filter(task => {
                    return task.id !== action.id;
                })
            };

        case UPDATE_REPETITIONS:
            return {
                ...state,
                repetitions: action.repetitions
            };

        case COMPLETE_ATTEMPT:
            return {
                ...state,
                attempts: state.attempts.map(attempt => {
                    return (attempt.id !== action.id ? attempts: {...attempt, complete:true});
                })
            };

           case UNDO_ATTEMPT:
            return {
                ...state,
                attempts: state.attempts.map(attempt => {
                    return (attempt.id !== action.id ? attempt : {...attempt, complete:false});
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

const useTaskContext = () => {
    return useContext(TaskContext);
};

export { TaskProvider, useTaskContext };