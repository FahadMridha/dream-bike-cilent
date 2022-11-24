import React from "react";

const ButtonComponent = ({ children }) => {
  return (
    <button className="btn bg-green-800 hover:bg-green-900 text-white">
      {children}
    </button>
  );
};

export default ButtonComponent;
