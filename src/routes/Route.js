import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import Main from "../layout/main/Main";
import AllProducts from "../pages/allProducts/AllProducts";
import Blog from "../pages/blog/Blog";
import AddProducts from "../pages/dashboard/addProducts/AddProducts";
import AllBuyer from "../pages/dashboard/allBuyer/AllBuyer";
import AllSeller from "../pages/dashboard/allSeller/AllSeller";
import MyOrder from "../pages/dashboard/myOrder/MyOrder";
import MyProducts from "../pages/dashboard/myProducts/MyProducts";
import ReportedItems from "../pages/dashboard/ReportedItems/ReportedItems";
import Home from "../pages/home/home/Home";

import Login from "../pages/login/Login";
import SignUp from "../pages/register/SignUp";
import ErrrorPage from "../pages/shared/error/ErrorPage";
import PrivateRoute from "./private/PrivateRoute";

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
            `http://localhost:5000/allProducts?categoryID=${params.categoryID}`,
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
    children: [
      {
        path: "/dashboard/myorder",
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
        path: "/dashboard/reportedItems",
        element: <ReportedItems />,
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
