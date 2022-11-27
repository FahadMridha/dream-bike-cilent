import React from "react";
import { Link, useRouteError } from "react-router-dom";
import errorphoto from "../../../assets/image/404.jpg";
import ButtonComponent from "../../../component/button/ButtonComponent";

const ErrrorPage = () => {
  const error = useRouteError();
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <img className="w-5/6" src={errorphoto} alt="" />
          <p className="text-red-400">{error.statusText || error.message}</p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            to="/"
            rel="noopener noreferrer"
            className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          >
            <ButtonComponent>Back to homepage</ButtonComponent>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrrorPage;
