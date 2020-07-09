import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const routes = [
  { name: "Login", path: "/", exact: true, main: () => <Login /> },
  { name: "Register", path: "/register", exact: true, main: () => <Register /> }
];

export default routes;
