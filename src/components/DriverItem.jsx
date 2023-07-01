import React, { useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import Images from "../assets/images/Image";

const DriverItem = ({ driver, driverData, data, index }) => {
  const [isOpen, setOpen] = useState(true);
  return (
    <>
      <div
        key={driver.id}
        className="bg-[#393743] h-20 w-full border-b-[1px] border-gray-500 grid grid-cols-5 gap-6 p-4 px-8"
      >
        <div className="flex items-center justify-start gap-10 col-span-2">
          <span className="text-gray-300">{index}</span>
          <div className="w-16 aspect-[5/4] overflow-hidden hidden md:block -mt-2">
            <img
              src={driver.img}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-200 flex items-center gap-2 text-lg md:text-xl font-light">
            <span>{driver.name?.[0] ?? ""}</span>
            <span className="font-semibold">{driver.name?.[1] ?? ""}</span>
          </p>
        </div>
        <div className="col-span-3 flex items-center justify-evenly">
          <div className="text-center text-gray-300 gap-3 items-center flex">
            <p className="uppercase text-sm">Current lap</p>
            <p className="text-gray-200 text-3xl font-semibold -mt-2">
              {data?.find((item) => item.id === driver.id)?.current_lap ?? 0}
            </p>
          </div>
          <div className="relative">
            <div className="text-3xl md:text-5xl font-bold opacity-30 text-gray-100 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {driver.id}
            </div>
            <img
              src={Images.car2}
              className="w-20 md:w-32 -mb-2 brightness-75 opacity-75"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <AiOutlineCaretRight
          className={`text-gray-200 my-4 ml-3 cursor-pointer hover: opacity-60 transition-all ${
            isOpen ? "rotate-90" : ""
          }`}
          onClick={() => {
            setOpen(!isOpen);
          }}
          size={15}
        />
        <table className="w-full text-center mb-6 block">
          <thead className="text-gray-200 block w-full">
            <tr className="grid grid-cols-3 w-full">
              <th className="font-semibold text-lg py-2">Lap</th>
              <th className="font-semibold text-lg py-2">Lap Time</th>
              <th className="font-semibold text-lg py-2">Lap Speed</th>
            </tr>
          </thead>
          <tbody
            className={`${
              isOpen ? "max-h-[1000px]" : "max-h-0"
            } transition-all duration-500 overflow-hidden block w-full`}
          >
            {driverData(driver.id)?.lap_time?.map((time, index) => (
              <tr className="grid grid-cols-3 w-full" key={index}>
                <td className="text-gray-400 py-1">{index + 1}</td>
                <td className="text-gray-400 py-1">{time?.toFixed(2) + "s"}</td>
                <td className="text-gray-400 py-1">
                  {driverData(driver.id)?.lap_speed?.[index]?.toFixed(2) +
                    " km/h"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DriverItem;
