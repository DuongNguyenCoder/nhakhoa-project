import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { currentUser, isSignIn } = useSelector((state) => state.app);
  if (!isSignIn || !currentUser || currentUser.role !== "ADMIN") {
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;
