import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "./NotFound";
import Apps from "../pages/Apps";
import { Wrapper } from "./Router.styled";

const routes = [
    {
        id: "home",
        path: "/",
        exact: true,
        component: (props) => <Home {...props} />,
    },
    {
        id: "login",
        path: "/login",
        exact: true,
        component: (props) => <Login {...props} />,
    },
    {
        id: "apps",
        path: "/apps",
        exact: true,
        component: (props) => <Apps {...props} />,
    },
    {
        id: "404",
        path: "*",
        exact: false,
        component: () => <NotFound />,
    },
];

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => {
                    const component = (
                        <React.Fragment>
                            <Navbar />
                            <Wrapper>{route.component()}</Wrapper>
                        </React.Fragment>
                    );
                    return (
                        <Route
                            key={route.id}
                            exact={route.exact}
                            path={route.path}
                            element={component}
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
