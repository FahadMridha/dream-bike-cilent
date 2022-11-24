import React from "react";
import Advertised from "../advertised/Advertised";
import Banner from "../banner/Banner";
import ProductCategories from "../productCategories/ProductCategories";

const Home = () => {
  return (
    <div>
      <Banner />
      <Advertised />
      <ProductCategories />
    </div>
  );
};

export default Home;
