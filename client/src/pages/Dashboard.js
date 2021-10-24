import React from 'react';
import Nav from '../components/Nav';
import TaskList from '../components/TaskList';
import { Container } from "../components/Matrix";
import Charts from "../components/DashBarCharts";
import Tasks from '../components/Tasks';
import 

const Dashboard = () => {
    return (
        <div className="container">
            <Nav />
            <TaskList />
            <Tasks />
<<<<<<< HEAD
            // <Calendar />
=======
           
>>>>>>> fbe7f24302bb3a0fa42743b69077f090381517d4
            <Charts />
            <Container/>
        </div>
    );
};

export default Dashboard;