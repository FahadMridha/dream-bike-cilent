import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../../shared/spinner/Spinner";

const AllSeller = () => {
  const {
    data: sellers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users?role=seller");
      const data = await res.json();
      return data;
    },
  });

  const handlerDeleteSeller = (seller) => {
    fetch(`http://localhost:5000/users/${seller._id}`, {
      method: "DELETE",
      // headers: {
      //   authorazition: `bearer ${localStorage.getItem("access-token")}`,
      // },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Doctor ${seller.name} Deleted Successfully`);
          refetch();
        }
        console.log(data);
      });
  };
  //   const handleMakeAdmin = (id) => {
  //     if (id) {
  //       fetch(`http://localhost:5000/users/admin/${id}`, {
  //         method: "PUT",
  //         headers: {
  //           authorazition: `bearer ${localStorage.getItem("access-token")}`,
  //         },
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           if (data.modifiedCount > 0) {
  //             toast.success("Make admin Successfully");
  //             refetch();
  //           }
  //         });
  //     }
  //   };
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
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, i) => (
              <tr key={seller._id}>
                <th>{i + 1}</th>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>
                  {seller?.role !== "admin" && (
                    <button
                      //   onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
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
