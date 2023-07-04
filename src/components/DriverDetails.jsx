import React from "react";
import DriverItem from "./DriverItem";
import useDriverStore from "../hooks/useDriverInfo";

const DriverDetails = ({ data }) => {
  const driverInfo = useDriverStore();
  const drivers = driverInfo.drivers;
  const driverData = (id) => data?.find((item) => item.id === id);
  return (
    <div className="p-6 grid gap-3">
      <h1 className="text-gray-200 text-xl mt-10 font-semibold">
        Drivers details
      </h1>
      <div className="overflow-y-auto xl:max-h-[calc(100vh-280px)]">
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
