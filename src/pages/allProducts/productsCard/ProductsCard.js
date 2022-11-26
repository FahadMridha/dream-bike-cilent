import React from "react";
import ButtonComponent from "../../../component/button/ButtonComponent";

const ProductsCard = ({ product }) => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={product.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Name: {product.ProductName}</h2>
        <p>Location: {product.location}</p>
        <p>Resale Price :{product.resalePrice} BDT</p>
        <p>Original Price: {product.originalPrice} BDT</p>
        <p>Year of Use: {product.yearOfUse}</p>
        <p>Post Date: {product.postTime}</p>
        <p>Seller's name: {product.sellerName}</p>

        <div className="card-actions justify-end">
          {/* <ButtonComponent htmlFor="booking-modal">Book Now</ButtonComponent> */}
          <label htmlFor="booking-modal" className="btn">
            open modal
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
