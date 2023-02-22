import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  padding-top: 30px;
  & > h2 {
    margin-bottom: 30px;
  }
`;

const GoBackLink = styled(NavLink)`
  color: #0a66c2;
  font-size: 16px;
  text-decoration: none;
  opacity: 0.7;
  font-weight: bold;
  &:hover {
    opacity: 1;
    transition: 0.5s;
  }
`;

export { Container, GoBackLink };
