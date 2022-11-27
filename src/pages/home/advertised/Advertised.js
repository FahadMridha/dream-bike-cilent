import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../../shared/spinner/Spinner";
import AdvertiseCard from "./advertiseCard/AdvertiseCard";

const Advertised = () => {
  const { data: advertise = [], isLoading } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/advertise");
      const data = await res.json();
      console.log(data);

      return data;
    },
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="m-6">
      <h4 className="text-center">Advertised {advertise.length}</h4>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {advertise &&
          advertise.map((adv) => (
            <AdvertiseCard key={adv._id} advertise={adv} />
          ))}
      </div>
    </div>
  );
};

export default Advertised;
