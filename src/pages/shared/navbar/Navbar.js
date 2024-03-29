import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthPovider";

import logo from "../../../assets/image/logo.png";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlerLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const menuItems = (
    <>
      <>
        <li className="font-semibold">
          <Link to="/home">Home</Link>
        </li>

        <li className="font-semibold">
          <Link to="/blog">Blog</Link>
        </li>
        <li className="font-semibold">
          <Link to="/products">Products</Link>
        </li>
      </>
      {user?.email ? (
        <>
          <li className="font-semibold">
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handlerLogout} className="btb btn-ghost">
              Log Out
            </button>
          </li>
        </>
      ) : (
        <li className="font-semibold">
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar h-20  p-10 bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <img className="w-10 h-10" src={logo} alt="" />
        <Link to="/" className="">
          <span className="text-4xl font-semibold text-green-800 ">
            <span className="text-red-700">DREAM</span> BIKE
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
    </div>
  );
};

export default Header;
