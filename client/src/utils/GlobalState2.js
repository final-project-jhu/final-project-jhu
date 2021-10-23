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