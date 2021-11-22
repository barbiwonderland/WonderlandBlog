import { Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";
export const PrivateRoute = ( ) => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet/> : <Navigate to="/login" />;
};
