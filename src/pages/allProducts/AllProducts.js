import axios from "axios";
import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ButtonComponent from "../../component/button/ButtonComponent";

const AllProducts = () => {
  const products = useLoaderData();
  console.log(products);
  return (
    <div>
      {products.map((product) => (
        <div
          key={product._id}
          className="card card-compact w-96 bg-base-100 shadow-xl"
        >
          <figure>
            <img src={product.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Model: {product.name}</h2>
            <p>Location: {product.location}</p>
            <p> Resale Price :{product.resalePrice} BDT</p>
            <p>Original Price: {product.originalPrice} BDT</p>
            <p>Year of Use: {product.yearOfUse}</p>
            <p>Post Date: {product.postTime}</p>
            <p>Post Date: {product.sellerNmae}</p>

            <div className="card-actions justify-end">
              <ButtonComponent>Book Now</ButtonComponent>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
