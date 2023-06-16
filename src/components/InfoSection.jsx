import React, { useState } from "react";
import VideoSection from "./VideoSection";
import TrackDetails from "./TrackDetails";
import OtherInfo from "./OtherInfo";
import TopInfo from "./TopInfo";
import { DriverList } from "./DriverList";

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
		<div className="grid grid-cols-12 min-h-[calc(100vh-104px)]">
			<div className="col-span-5 bg-[#393743] min-h-full p-6 flex flex-col">
				<VideoSection frame={frame} />
				<TrackDetails />
				<OtherInfo />
			</div>
			<div className="bg-[#2f2c36] w-full col-span-7">
				<div className="flex p-6 pb-0 text-gray-200 text-xl font-light">
					{tabs.map((tab, index) => (
						<div
							className={`${index !== tabs.length - 1 ? "border-r-[1px]" : ""} ${
								selectedTab === tab.id ? "font-semibold" : ""
							} px-3 relative leading-5 cursor-pointer transition-all`}
							onClick={() => setSelectedTab(tab.id)}
							key={tab.id}
						>
							{tab.text}
							{selectedTab === tab.id && <div className="absolute w-full h-1 bg-red-400 left-0 -bottom-4"></div>}
						</div>
					))}
				</div>
				{selectedTab === 1 ? (
					<>
						<TopInfo data={data} />
						<DriverList data={data} />
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default InfoSection;
