import React from "react";

const Spinner = () => {
  return (
    <>
      <p className="text-3xl">Loding....</p>
      <div className="content-center w-14 h-14 border-4 border-dashed rounded-full animate-spin border-green-600 dark:border-green-700"></div>
    </>
  );
};

export default Spinner;
