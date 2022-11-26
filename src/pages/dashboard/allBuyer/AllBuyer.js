import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AllBuyer = () => {
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users?role=buyer");
      const data = await res.json();
      return data;
    },
  });
  const handlerDeletBayer = (buyer) => {
    fetch(`http://localhost:5000/users/${buyer._id}`, {
      method: "DELETE",
      // headers: {
      //   authorazition: `bearer ${localStorage.getItem("access-token")}`,
      // },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Buyer ${buyer.name} Deleted Successfully`);
          refetch();
        }
        console.log(data);
      });
  };

  return (
    <div>
      <h2 className="text-3xl">All Buyers</h2>

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
            {buyers.map((buyer, i) => (
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>
                  {buyer?.role !== "admin" && (
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
                    onClick={() => {
                      handlerDeletBayer(buyer);
                    }}
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

export default AllBuyer;
