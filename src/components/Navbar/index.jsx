import React from "react";
import { Nav, NavLink } from "./Navbar.styled";

const Navbar = () => {
    return (
        <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/apps">Apps</NavLink>
        </Nav>
    );
};

export default Navbar;
