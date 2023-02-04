import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../../shared/spinner/Spinner";
import AdvertiseCard from "./advertiseCard/AdvertiseCard";

const Advertised = () => {
  const { data: advertise = [], isLoading } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await fetch(
        "https://dream-bike-alpha-green.vercel.app/advertise",
        {
          headers: {
            authorazition: `bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      const data = await res.json();

      return data;
    },
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="my-12">
      <h4 className="text-center text-5xl font-semibold text-green-700 m-4">
        New Arrivale
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 mt-8 mb-8">
        {advertise &&
          advertise?.map((adv) => (
            <AdvertiseCard key={adv._id} advertise={adv} />
          ))}
      </div>
    </div>
  );
};

export default Advertised;
