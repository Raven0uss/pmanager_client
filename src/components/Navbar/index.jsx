import React from "react";
import { useNavigate } from "react-router";
import { clearToken } from "../../hooks/useToken";
import { Nav, NavLink } from "./Navbar.styled";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/apps">Apps</NavLink>
            <button onClick={() => {
                clearToken();
                navigate('/login');
            }}>Log out</button>
        </Nav>
    );
};

export default Navbar;
