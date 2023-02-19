import React from "react";
import { Link } from "react-router-dom";

import { Container } from "./NotFound.styled";

const NotFound = () => {
    return (
        <Container>
            <h2>{window.location.pathname} not found.</h2>
            <Link to="/">Home</Link>
        </Container>
    );
};

export default NotFound;