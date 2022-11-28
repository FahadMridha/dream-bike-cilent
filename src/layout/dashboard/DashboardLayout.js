import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthPovider";
import useAdmin from "../../hooks/useAdimn";
import useBuyer from "../../hooks/useBuyer";
import useSeller from "../../hooks/useSeller";

import Navbar from "../../pages/shared/navbar/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);

  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-dwawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-dwawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80  text-base-content">
            {isSeller && (
              <>
                <li>
                  <Link to="/dashboard/myproduct">My Products</Link>
                </li>
                <li>
                  <Link to="/dashboard/addproduct">Add A product</Link>
                </li>
              </>
            )}
            {isBuyer && (
              <li>
                <Link to="/dashboard/myorder">My Orders</Link>
              </li>
            )}

            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/allsellers">All Sellers</Link>
                </li>
                <li>
                  <Link to="/dashboard/allbuyer">All Buyers</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
