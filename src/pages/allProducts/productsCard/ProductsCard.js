import React from "react";
import toast from "react-hot-toast";

const ProductsCard = ({ product }) => {
  const handlerReporting = (product) => {
    //   save a reported product
    fetch(" https://dream-bike-alpha-green.vercel.app/reported", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorazition: `bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success(`${product.ProductName} is reported to admin`);
        }
      });
  };

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
          <button
            onClick={() => handlerReporting(product)}
            className="btn btn-warning"
          >
            Reporte
          </button>
          <label
            htmlFor="booking-modal"
            className="btn bg-green-800 hover:bg-green-700"
          >
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
