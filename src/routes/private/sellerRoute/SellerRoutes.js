import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthPovider";
import useSeller from "../../../hooks/useSeller";
import Spinner from "../../../pages/shared/spinner/Spinner";

const SellerRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  if (loading || isSellerLoading) {
    return <Spinner />;
  }
  if (user && isSeller) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoutes;
