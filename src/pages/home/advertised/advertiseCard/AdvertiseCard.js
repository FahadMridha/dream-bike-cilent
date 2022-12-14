import React from "react";

const AdvertiseCard = ({ advertise }) => {
  // console.log(advertise);
  const {
    image,
    resalePrice,
    postTime,
    location,
    yearOfUse,
    categoryID,
    ProductName,
    phoneNumber,
    description,
    condition,
  } = advertise;

  return (
    <>
      <div className="card card-compact  bg-base-100 shadow-xl">
        <figure>
          <img className="h-64 object-cover" src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Title: {ProductName}</h2>
          <p>Product Condition: {condition}</p>
          <p className="font-bold"> Price: {resalePrice} BDT</p>
          <p>{description} </p>
          <p>Post Date:{postTime}</p>
          <p>Location: {location}</p>
          <p>Phone: {phoneNumber}</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  );
};

export default AdvertiseCard;
