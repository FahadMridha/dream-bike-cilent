import React from "react";
import Advertised from "../advertised/Advertised";
import Banner from "../banner/Banner";
import ProductCategories from "../productCategories/ProductCategories";
import Offer from "./offerSection/Offer";

const Home = () => {
  return (
    <div>
      <Banner />
      <Advertised />
      <ProductCategories />
      <Offer />
    </div>
  );
};

export default Home;
