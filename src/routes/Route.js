import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import Main from "../layout/main/Main";
import AllProducts from "../pages/allProducts/AllProducts";
import AddProducts from "../pages/dashboard/addProducts/AddProducts";
import AllBuyer from "../pages/dashboard/allBuyer/AllBuyer";
import AllSeller from "../pages/dashboard/allSeller/AllSeller";
import MyOrder from "../pages/dashboard/myOrder/MyOrder";
import MyProducts from "../pages/dashboard/myProducts/MyProducts";
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
    children: [
      {
        path: "/dashboard",
        element: <MyOrder />,
      },
      {
        path: "/dashboard/myproduct",
        element: <MyProducts />,
      },
      {
        path: "/dashboard/allbuyer",
        element: <AllBuyer />,
      },
      {
        path: "/dashboard/addproduct",
        element: <AddProducts />,
      },
      {
        path: "/dashboard/allsellers",
        element: <AllSeller />,
      },
      // {
      //   path: "/dashboard/payment/:id",
      //   element: (
      //     <AdminRoutes>
      //       "<Payment />"
      //     </AdminRoutes>
      //   ),
      //   loader: ({ params }) =>
      //     fetch(`http://localhost:5000/bookings/${params.id}`),
      // },
    ],
  },
]);
