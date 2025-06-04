import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { authUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
