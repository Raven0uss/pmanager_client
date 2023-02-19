import React from "react";
import { Link } from "react-router-dom";

import { Container } from "./NotFound.styled";

const NotFound = () => {
    return (
        <Container>
            <h2>Oops, this page does not exist !</h2>
            <Link to="/">Go back to home, sweet home...</Link>
        </Container>
    );
};

export default NotFound;