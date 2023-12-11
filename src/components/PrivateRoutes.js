import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useSelector((state) => {
    return state.auth.user;
  });
  return user ? <Outlet /> : <Navigate to="/auth/signup" />;
};

export default PrivateRoutes;
