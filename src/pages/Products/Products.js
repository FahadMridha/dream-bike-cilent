import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthPovider";
import Spinner from "../shared/spinner/Spinner";

const Products = () => {
  const { loading } = useContext(AuthContext);
  //   const [products, setProducts] = useState([]);
  const url = "https://dream-bike-alpha-green.vercel.app/allProducts";
  //   useEffect(() => {
  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((data) => setProducts(data));
  //   }, []);
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(url);
      //     {
      //     headers: {
      //       authorazition: `bearer ${localStorage.getItem("access-token")}`,
      //     },
      //   });
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h3 className="text-5xl m-5 text-center">All Products</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Picture</th>
              <th>Titale</th>
              <th>Price</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {products.length &&
              products?.map((product, i) => (
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={product.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{product.ProductName}</td>
                  <td>{product.resalePrice} BDT</td>
                  <td>
                    {/* <button onClick={"#"} className="btn btn-xs btn-warning">
                      Like
                    </button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
