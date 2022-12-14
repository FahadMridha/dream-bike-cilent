import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../../shared/spinner/Spinner";

const AllSeller = () => {
  const [seller, setSeller] = useState([]);
  const {
    data: sellers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await fetch(
        "https://dream-bike-alpha-green.vercel.app/users?role=seller"
      );
      const data = await res.json();
      setSeller(data);
      return data;
    },
  });

  const handlerDeleteSeller = (seller) => {
    fetch(`https://dream-bike-alpha-green.vercel.app/users/${seller._id}`, {
      method: "DELETE",
      headers: {
        authorazition: `bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Seller ${seller.name} Deleted Successfully`);
          refetch();
        }
        console.log(data);
      });
  };

  const handleMakeVerify = (id) => {
    fetch(`https://dream-bike-alpha-green.vercel.app/users/seller/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Verified" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Usser Verified  Succesfully");
          const remaning = seller.filter((odr) => odr._id !== id);
          const approving = seller.find((odr) => odr._id === id);
          approving.status = "Verified";
          const newOrder = [approving, ...remaning];

          setSeller(newOrder);
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h2 className="text-3xl">All Sellers</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length &&
              sellers?.map((seller, i) => (
                <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>
                    <button
                      onClick={() => handleMakeVerify(seller._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      {seller.status ? seller.status : " Unverified"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handlerDeleteSeller(seller)}
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

export default AllSeller;
