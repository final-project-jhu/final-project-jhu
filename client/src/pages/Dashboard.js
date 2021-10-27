import React from 'react';
import Nav from '../components/Nav';
import TaskList from '../components/TaskList';
import { Container } from "../components/Matrix";
import Charts from "../components/DashBarCharts";
import Tasks from '../components/Tasks';


const Dashboard = () => {
    return (
        <div className="container">
            <Nav />
            {/* <TaskList /> */}
            {/* <Tasks /> */}
            {/* <Charts /> */}
            {/* <Container/> */}
            <h1>Hello</h1>
        </div>
    );
};

export default Dashboard;