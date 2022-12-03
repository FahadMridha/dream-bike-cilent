import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import Main from "../layout/main/Main";
import AllProducts from "../pages/allProducts/AllProducts";
import Blog from "../pages/blog/Blog";
import AddProducts from "../pages/dashboard/addProducts/AddProducts";
import AllBuyer from "../pages/dashboard/allBuyer/AllBuyer";
import AllSeller from "../pages/dashboard/allSeller/AllSeller";
import Dashboard from "../pages/dashboard/Dashboard";
import MyOrder from "../pages/dashboard/myOrder/MyOrder";
import MyProducts from "../pages/dashboard/myProducts/MyProducts";
import Payment from "../pages/dashboard/payment/Payment";
import ReportedItems from "../pages/dashboard/ReportedItems/ReportedItems";
import Home from "../pages/home/home/Home";

import Login from "../pages/login/Login";
import SignUp from "../pages/register/SignUp";
import ErrrorPage from "../pages/shared/error/ErrorPage";
import AdminRoutes from "./private/adminRoute/AdminRoutes";
import PrivateRoute from "./private/PrivateRoute";
import SellerRoutes from "./private/sellerRoute/SellerRoutes";

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
        path: "/blog",
        element: <Blog />,
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
        path: "/category/:categoryID",
        element: (
          <PrivateRoute>
            <AllProducts />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://dream-bike-alpha-green.vercel.app/allProducts?categoryID=${params.categoryID}`,
            {
              headers: {
                authorazition: `bearer ${localStorage.getItem("access-token")}`,
              },
            }
          ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/myorder",
        element: <MyOrder />,
      },
      {
        path: "/dashboard/myproduct",
        element: (
          <SellerRoutes>
            <MyProducts />
          </SellerRoutes>
        ),
      },
      {
        path: "/dashboard/allbuyer",
        element: (
          <AdminRoutes>
            <AllBuyer />
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <SellerRoutes>
            <AddProducts />
          </SellerRoutes>
        ),
      },
      {
        path: "/dashboard/reportedItems",
        element: (
          <AdminRoutes>
            <ReportedItems />
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <AdminRoutes>
            <AllSeller />
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment />,
        loader: ({ params }) =>
          fetch(
            `https://dream-bike-alpha-green.vercel.app/bookings/${params.id}`
          ),
      },
    ],
  },
]);
