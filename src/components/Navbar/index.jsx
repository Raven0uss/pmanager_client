import React from "react";
import { useNavigate } from "react-router";
import { clearToken } from "../../hooks/useToken";
import { Nav, NavLink } from "./Navbar.styled";
import withAuth from "../../hoc/withAuth";

const Navbar = ({ isAuth }) => {
    const navigate = useNavigate();

    return (
        <Nav>
            <NavLink to="/">Home</NavLink>
            {isAuth && <NavLink to="/apps">Apps</NavLink>}
            {isAuth ? <button onClick={() => {
                clearToken();
                navigate('/login');
            }}>Log out</button>
                :
                <button onClick={() => {
                    navigate('/login');
                }} >
                    Login
                </button>
            }
        </Nav>
    );
};

export default withAuth({ redirect: false, enableLoading: false })(Navbar);
