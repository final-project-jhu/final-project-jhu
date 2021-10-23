import React, { createContext, useContext } from 'react';
// import { useProductReducer } from './reducers';

const TaskContext = createContext();
const { Provider } = TaskContext;

const TaskManager = ({ value = [], ...props }) => {
    const [state, dispatch] = useTaskReducer({
        tasks: [],
        members: [],
        taskCompleted: false,
    });

    return <Provider value={[state, dispatch]} {...props} />;

};

const useTaskContext = () => {
    return useContext(TaskContext);
};

export { TaskManager, useTaskContext };

