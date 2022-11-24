import { Children } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/Route";

function App() {
  return (
    <div className="all-body">
      <RouterProvider router={router}>{Children}</RouterProvider>
    </div>
  );
}

export default App;
