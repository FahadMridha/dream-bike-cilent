import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import Main from "../layout/main/Main";
import AllProducts from "../pages/allProducts/AllProducts";
import Home from "../pages/home/home/Home";

import Login from "../pages/login/Login";
import SignUp from "../pages/register/SignUp";
import ErrrorPage from "../pages/shared/error/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/category/:id",
        element: <AllProducts />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    // children: [
    //   {
    //     path: "/dashboard",
    //     element: <MyAppiontments />,
    //   },
    //   {
    //     path: "/dashboard/allusers",
    //     element: (
    //       <AdminRoutes>
    //         <AllUsers />
    //       </AdminRoutes>
    //     ),
    //   },
    //   {
    //     path: "/dashboard/adddoctor",
    //     element: (
    //       <AdminRoutes>
    //         <AddDoctor />
    //       </AdminRoutes>
    //     ),
    //   },
    //   {
    //     path: "/dashboard/managedoctors",
    //     element: (
    //       <AdminRoutes>
    //         <ManageDoctors />
    //       </AdminRoutes>
    //     ),
    //   },
    //   {
    //     path: "/dashboard/payment/:id",
    //     element: (
    //       <AdminRoutes>
    //         "<Payment />"
    //       </AdminRoutes>
    //     ),
    //     loader: ({ params }) =>
    //       fetch(`http://localhost:5000/bookings/${params.id}`),
    //   },
    // ],
  },
]);
