import React, { useEffect, useState } from "react";
import Spinner from "../../shared/spinner/Spinner";
import CategoryCard from "./CategoryCard";

const ProductCategories = () => {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://dream-bike-alpha-green.vercel.app/allCategories")
      .then((res) => res.json())
      .then((data) => {
        setCategorys(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <p className="text-4xl text-center text-red-600 my-16">
        Products Category
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 mt-8 mb-8">
        {categorys &&
          categorys.map((category) => (
            <CategoryCard key={category._id} category={category}></CategoryCard>
          ))}
      </div>
    </div>
  );
};

export default ProductCategories;
