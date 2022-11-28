import React from "react";
import Advertised from "../advertised/Advertised";
import Banner from "../banner/Banner";
import ContactUs from "../contactUs/ContactUs";
import ProductCategories from "../productCategories/ProductCategories";
import Offer from "./offerSection/Offer";

const Home = () => {
  return (
    <div>
      <Banner />
      <Advertised />
      <ProductCategories />
      <Offer />
      <ContactUs />
    </div>
  );
};

export default Home;
