import React, { useState } from "react";
import VideoSection from "./VideoSection";
import TrackDetails from "./TrackDetails";
import OtherInfo from "./OtherInfo";
import TopInfo from "./TopInfo";
import { DriverList } from "./DriverList";
import DriverDetails from "./DriverDetails";

const tabs = [
  {
    id: 1,
    text: "Highlights",
  },
  { id: 2, text: "Race details" },
];
const InfoSection = ({ frame, data }) => {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <div className="flex-flex-col xl:grid grid-cols-12 xl:h-[calc(100vh-84px)]">
      <div className="col-span-5 bg-[#393743] p-6 flex flex-col gap-10">
        <VideoSection frame={frame} />
        <TrackDetails />
        <OtherInfo />
      </div>
      <div className="bg-[#2f2c36] col-span-7 grid grid-cols-1 custom-grid">
        <div className="flex p-6 pb-0 text-gray-200 text-lg font-light -ml-3">
          {tabs.map((tab, index) => (
            <div
              className={`${
                index !== tabs.length - 1 ? "border-r-[1px]" : ""
              } ${
                selectedTab === tab.id ? "font-semibold" : ""
              } px-3 relative leading-5 cursor-pointer transition-all`}
              onClick={() => setSelectedTab(tab.id)}
              key={tab.id}
            >
              {tab.text}
              {selectedTab === tab.id && (
                <div
                  className="absolute w-full h-1 
							left-0 -bottom-5 px-3"
                >
                  <div className="w-full h-full bg-red-400"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        {selectedTab === 1 ? (
          <>
            <TopInfo data={data} />
            <DriverList data={data} />
          </>
        ) : (
          <DriverDetails data={data} />
        )}
      </div>
    </div>
  );
};

export default InfoSection;
