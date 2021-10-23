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
                