import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const HomeTitle = styled.h1`
  font-size: 20px;
`;

const HomeSubtitle = styled.div`
  font-size: 16px;
  & div {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

const Link = styled(NavLink)`
  color: #606060;
  text-decoration: none;
  opacity: 0.6;
  font-weight: bold;
  &:hover {
    opacity: 1;
    transition: 0.5s;
  }
`;

export { HomeTitle, HomeContainer, HomeSubtitle, Link };
