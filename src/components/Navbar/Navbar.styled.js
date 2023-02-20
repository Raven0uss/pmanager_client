import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #f6f6f6;
  box-shadow: 0px 3px 5px #f6f6f6;
  justify-content: space-between;
`;

const NavLink = styled(Link)`
  color: black;
  font-size: 18px;
  font-weight: ${({ iscurrentloc }) =>
    iscurrentloc === "true" ? "bold" : "normal"};
  text-decoration: none;
  margin-left: 5px;
  margin-right: 5px;
  &:hover {
    cursor: ${({ iscurrentloc }) =>
      iscurrentloc === "true" ? "default" : "pointer"};
    opacity: ${({ iscurrentloc }) => (iscurrentloc === "true" ? "1" : "0.5")};
    transition: 0.3s;
  }
`;

const NavLeft = styled.div`
  margin-left: 10px;
`;

const NavRight = styled.div`
  margin-right: 30px;
`;

export { Nav, NavLink, NavLeft, NavRight };
