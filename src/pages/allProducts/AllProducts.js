import axios from "axios";
import React, { useEffect } from "react";

const AllProducts = () => {
  useEffect(() => {
    axios.get("http://localhost:5000/allCategories").then((response) => {
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      <h3>All Products</h3>
    </div>
  );
};

export default AllProducts;
