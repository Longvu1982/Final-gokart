import React from "react";
import Images from "../assets/images/Image";
import DriverItem from "./DriverItem";

const drivers = [
  {
    id: 12,
    img: Images.driver1,
    name: ["Michael", "Suboi"],
  },
  {
    id: 13,
    img: Images.driver2,
    name: ["Sebatial", "Raz"],
  },
  {
    id: 14,
    img: Images.driver3,
    name: ["Infinity", "Beyond"],
  },
];

const DriverDetails = ({ data }) => {
  const driverData = (id) => data?.find((item) => item.id === id);
  return (
    <div className="p-6 grid gap-3">
      <h1 className="text-gray-200 text-xl mt-10 font-semibold">
        Drivers details
      </h1>
      <div className="overflow-y-scroll max-h-[calc(100vh-280px)]">
        {drivers.map((driver, index) => (
          <DriverItem
            key={index}
            driver={driver}
            driverData={driverData}
            data={data}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DriverDetails;
