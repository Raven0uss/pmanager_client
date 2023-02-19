import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const NavLink = styled(Link)`
  color: red;
`;

export { Nav, NavLink };
