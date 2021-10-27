import React, { createContext, useContext } from "react";
import { useTaskReducer } from './reducers'

const TaskContext = createContext();
const { Provider } = TaskContext;

const TaskProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useTaskReducer({
      members: [],
      tasks: [],
      attempts: [],

  });

  return <Provider value={[state, dispatch]} {...props} />
};


const useTaskContext = () => {
  return useContext(TaskContext);
};

export { TaskProvider, useTaskContext };
