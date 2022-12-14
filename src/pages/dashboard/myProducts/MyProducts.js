import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthPovider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const url = `https://dream-bike-alpha-green.vercel.app/allProducts?email=${user?.email}`;
  const { data: myProducts = [], refetch } = useQuery({
    queryKey: ["product", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorazition: `bearer ${localStorage.getItem("access-token")}`,
        },
      });
      const data = await res.json();
      // console.log(data);
      return data;
    },
  });

  const handlerDeleteProduct = (product) => {
    fetch(
      `https://dream-bike-alpha-green.vercel.app/allProducts/${product._id}`,
      {
        method: "DELETE",
        headers: {
          authorazition: `bearer ${localStorage.getItem("access-token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(
            `Your product ${product.productName} Deleted Successfully`
          );
          refetch();
        }
        console.log(data);
      });
  };

  const handlerAdvertise = (product) => {
    console.log(product);
    fetch("https://dream-bike-alpha-green.vercel.app/advertise", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("This product added for advertise");
          refetch();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3 className="text-3xl mb-5 text-green-900 font-bold">MY PRODUCTS</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Picture</th>
              <th>Status</th>
              <th>Price</th>
              <th>Advertise</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {myProducts &&
              myProducts?.map((product, i) => (
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={product.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{}</td>
                  <td>{product.resalePrice} BDT</td>
                  <td>
                    <button
                      className="btn btn-xs bg-green-800 hover:bg-green-700"
                      onClick={() => handlerAdvertise(product)}
                    >
                      Advertise
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handlerDeleteProduct(product)}
                      className="btn btn-xs btn-warning"
                    >
                      Detele
                    </button>
                  </td>

                  {/* <td>
                    {product.resalePrice && !product.paid && (
                      <Link to={`/dashboard/payment/${product._id}`}>
                        <button className="btn btn-primary btn-sm">Pay</button>
                      </Link>
                    )}
                    {product.price && product.paid && (
                      <button className="btn btn-success btn-sm ">Paid</button>
                    )}
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
