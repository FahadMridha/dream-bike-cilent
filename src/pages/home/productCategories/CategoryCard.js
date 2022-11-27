import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { categoryID, picture, name } = category;
  return (
    <div>
      <Link to={`/category/${categoryID}`}>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={picture} alt="Shoes" />
          </figure>
          <div className="card-body text-left">
            <h2 className="card-title">{name}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
