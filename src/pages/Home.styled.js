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

const MadeBy = styled.div`
  font-size: 12px;
  margin-top: 30px;
  border-top: dashed 1px;
  padding-top: 8px;
`;

const LinkedInLink = styled.a`
  color: #0a66c2;
  font-size: 14px;
  text-decoration: none;
  opacity: 0.7;
  font-weight: bold;
  &:hover {
    opacity: 1;
    transition: 0.5s;
  }
`;

export { HomeTitle, HomeContainer, HomeSubtitle, Link, MadeBy, LinkedInLink };
