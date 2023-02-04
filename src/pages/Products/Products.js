import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthPovider";
import Spinner from "../shared/spinner/Spinner";

const Products = () => {
  const { loading } = useContext(AuthContext);
  //   const [products, setProducts] = useState([]);
  const url = "https://dream-bike-alpha-green.vercel.app/allProducts";
  //   useEffect(() => {
  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((data) => setProducts(data));
  //   }, []);
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(url);
      //     {
      //     headers: {
      //       authorazition: `bearer ${localStorage.getItem("access-token")}`,
      //     },
      //   });
      const data = await res.json();
      // console.log(data);
      return data;
    },
  });
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className=" container grid grid-cols-1 lg:grid-cols-3 lg:gap-8 mt-20 mb-16">
      {products.length > 0 &&
        products.map((product) => (
          <div
            className="card container card-compact  bg-base-100 shadow-xl"
            key={product._id}
          >
            <figure>
              <img
                className="h-64 object-cover"
                src={product.image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Title: {product.ProductName}</h2>
              <p>Product Condition: {product.condition}</p>
              <p className="font-bold"> Price: {product.resalePrice} BDT</p>
              <p>{product.description} </p>
              <p>Post Date:{product.postTime}</p>
              <p>Location: {product.location}</p>
              <p>Phone: {product.phoneNumber}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
