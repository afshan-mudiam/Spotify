import React, { useContext } from "react";
import cookie from "js-cookie";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const jwt = cookie.get("jwt_token");
  if (!user || !jwt) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
