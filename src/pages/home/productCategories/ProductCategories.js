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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 mb-8">
        {categorys &&
          categorys.map((category) => (
            <CategoryCard key={category._id} category={category}></CategoryCard>
          ))}
      </div>
    </div>
  );
};

export default ProductCategories;
