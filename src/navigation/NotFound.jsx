import React from "react";
import { Container, GoBackLink } from "./NotFound.styled";

const NotFound = () => {
  return (
    <Container>
      <h2>Oops, this page does not exist ! 😵</h2>
      <GoBackLink to="/">Go back to home, sweet home 🏡...</GoBackLink>
    </Container>
  );
};

export default NotFound;
