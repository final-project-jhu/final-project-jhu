import React from "react";
import Code from "../components/Banner"; 

import Members from "../components/Members";


import { Container } from "../components/Matrix";   


const Teams = () => {
    return (
        <Container fluid>
            <Code />
            <Members />
            {/* <App/> */}
        </Container>
    );
};

export default Teams;