import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const ReportedItems = () => {
  const url = "https://dream-bike-alpha-green.vercel.app/reported";
  const { data: reportedProducts = [], refetch } = useQuery({
    queryKey: ["reportede"],
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
    console.log(product);
    fetch(`https://dream-bike-alpha-green.vercel.app/reported/${product._id}`, {
      method: "DELETE",
      headers: {
        authorazition: `bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Product ${product.ProductName} Deleted Successfully`);
          refetch();
        }
      });
  };

  return (
    <div>
      <h3 className="text-3xl mb-5">Reported Product</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Picture</th>
              <th>Titale</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reportedProducts.length &&
              reportedProducts?.map((product, i) => (
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={product.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.resalePrice} BDT</td>
                  <td>
                    <button
                      onClick={() => handlerDeleteProduct(product)}
                      className="btn btn-xs btn-warning"
                    >
                      Detele
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedItems;
