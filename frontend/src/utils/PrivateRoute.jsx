import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // If user is not authenticated, redirect to login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Allows nested routes to be rendered
};

export default PrivateRoute;
