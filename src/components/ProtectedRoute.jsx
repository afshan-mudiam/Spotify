import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user && !localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
