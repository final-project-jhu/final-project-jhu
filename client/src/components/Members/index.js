
import React from 'react';
import "./style.css";
import { Container, Table } from "react-bootstrap";
import { useTaskContext } from "../../utils/GlobalState"


const Members = () => {

    const state = useTaskContext()[0]
    return (

        <div className="d-flex justify-content-center">
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>


                            <th>Color</th>
                            <th>Name</th>
                            <th>Notification</th>
                        </tr>
                    </thead>

                    <tbody>
                        {state.members.map(member => {
                            return (
                                <tr key={member.id}>
                                    <td>
                                        <div style={{ height: 16, width: 16, backgroundColor: member.color }}></div>
                                    </td>
                                    <td>{member.name}</td>
                                    <td>OFF</td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
        
        
    );
};


export default Members;