import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthPovider";
import useAdmin from "../../../hooks/useAdimn";
import Spinner from "../../../pages/shared/spinner/Spinner";

const AdminRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  if (loading || isAdminLoading) {
    return <Spinner />;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoutes;
