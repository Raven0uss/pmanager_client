import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "./NotFound";

const routes = [
    {
        id: "home",
        path: "/",
        exact: true,
        component: (props) => <Home {...props} />,
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
                    return (
                        <Route
                            key={route.id}
                            exact={route.exact}
                            path={route.path}
                            element={route.component()}
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;