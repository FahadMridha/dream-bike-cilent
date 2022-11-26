import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthPovider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/allProducts?email=${user?.email}`;
  const { data: myProducts = [] } = useQuery({
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

  return (
    <div>
      <h3 className="text-3xl mb-5">My Orders</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Picture</th>
              <th>Titale</th>
              <th>Price</th>
              <th>Payment</th>
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
                        <img src={product.productImg} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.resalePrice} BDT</td>

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
