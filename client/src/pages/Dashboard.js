import React from 'react';
import Nav from '../components/Nav';
import TaskList from '../components/TaskList';
import Tasks from '../components/Tasks';

const Dashboard = () => {
    return (
        <div className="container">
            <Nav />
            <TaskList />
            <Tasks />
        </div>
    );
};

export default Dashboard;