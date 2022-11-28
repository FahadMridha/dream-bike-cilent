import React from "react";
import bgPhoto from "../../../assets/image/bannerBike.jpg";
import ButtonComponent from "../../../component/button/ButtonComponent";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-screen "
        style={{ backgroundImage: `url(${bgPhoto})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              WELCOME TO <span className="text-red-700 text-6xl"> DREAM </span>
              <span className="text-green-700 text-5xl">BIKE</span>
            </h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <ButtonComponent>Get Started</ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
