import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

const ProductCategories = () => {
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allCategories")
      .then((res) => res.json())
      .then((data) => setCategorys(data));
  }, []);

  return (
    <div>
      <h2>All categories: {categorys.length}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 m-4">
        {categorys.map((category) => (
          <CategoryCard key={category._id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
