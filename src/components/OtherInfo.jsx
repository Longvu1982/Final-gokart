import React from "react";
import { useTrackInfoStore } from "../hooks/useTrackInfo";

const OtherInfo = () => {
  const trackInfo = useTrackInfoStore();
  return (
    <div className="grid grid-cols-10 gap-6 flex-1">
      <div className="bg-[#2f2c36] col-span-7 p-4 pb-10">
        <h1 className="text-gray-200 font-semibold text-lg">
          {trackInfo.name}
        </h1>
        <p className="mt-2 text-gray-400">{trackInfo.description}</p>
      </div>
      <div className="bg-[#2f2c36] col-span-3"></div>
    </div>
  );
};

export default OtherInfo;
