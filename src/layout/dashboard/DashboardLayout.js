import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthPovider";
import useAdmin from "../../hooks/useAdimn";
import useBuyer from "../../hooks/useBuyer";
import useSeller from "../../hooks/useSeller";
// import { IoCaretForwardSharp } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";

import Navbar from "../../pages/shared/navbar/Navbar";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  // console.log(isSeller);

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
          <label
            htmlFor="dashboard-dwawer"
            className="btn btn-primary drawer-button lg:hidden"
            onClick={() => setOpen(!open)}
          >
            <SlArrowRight className="w-4 h-4" />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-dwawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80  text-base-content">
            {isSeller && (
              <>
                <li>
                  <Link
                    className="bg-green-800 hover:bg-green-700 w-3/4 text-white font-bold text-xl"
                    to="/dashboard/myproduct"
                  >
                    MY PRODUCTS
                  </Link>
                </li>
                <li>
                  <Link
                    className="bg-green-800 hover:bg-green-700 w-3/4 text-white font-bold text-xl"
                    to="/dashboard/addproduct"
                  >
                    ADD A PRODUCT
                  </Link>
                </li>
              </>
            )}
            {isBuyer && (
              <li>
                <Link
                  to="/dashboard/myorder"
                  className="bg-green-700 hover:bg-green-800 w-3/4 text-white font-bold text-xl"
                >
                  MY ORDERS
                </Link>
              </li>
            )}

            {isAdmin && (
              <>
                <li>
                  <Link
                    className="bg-green-800 hover:bg-green-700 w-3/4 text-white font-bold text-xl"
                    to="/dashboard/allsellers"
                  >
                    ALL SELLERS
                  </Link>
                </li>
                <li>
                  <Link
                    className="bg-green-800 hover:bg-green-700 w-3/4 text-white font-bold text-xl"
                    to="/dashboard/allbuyer"
                  >
                    ALL BUYERS
                  </Link>
                </li>
                <li>
                  <Link
                    className="bg-green-800 hover:bg-green-700 w-3/4 text-white font-bold text-xl"
                    to="/dashboard/reportedItems"
                  >
                    REPORTED ITMES
                  </Link>
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
