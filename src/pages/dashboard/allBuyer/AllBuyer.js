import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AllBuyer = () => {
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch(
        " https://dream-bike-alpha-green.vercel.app/users?role=buyer"
      );
      const data = await res.json();
      return data;
    },
  });
  const handlerDeletBayer = (buyer) => {
    fetch(` https://dream-bike-alpha-green.vercel.app/users/${buyer._id}`, {
      method: "DELETE",
      headers: {
        authorazition: `bearer ${localStorage.getItem("access-token")}`,
      },
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

              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyers.length &&
              buyers?.map((buyer, i) => (
                <tr key={buyer._id}>
                  <th>{i + 1}</th>
                  <td>{buyer.name}</td>
                  <td>{buyer.email}</td>

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
