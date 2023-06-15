import React from "react";
import VideoSection from "./VideoSection";
import TrackDetails from "./TrackDetails";
import OtherInfo from "./OtherInfo";

const InfoSection = ({ frame, data }) => {
	return (
		<div className="grid grid-cols-12 min-h-[calc(100vh-104px)]">
			<div className="col-span-5 bg-[#393743] min-h-full p-6 flex flex-col">
				<VideoSection frame={frame} />
				<TrackDetails />
				<OtherInfo />
			</div>
			<div>
				{data?.map((item) => (
					<>
						<p key={item.id}>{`${item.id}       ${item.current_lap}`}</p>
						<p>Lap time</p>
						{item?.lap_time?.map((time, index) => (
							<span key={index}>{index + 1 + ":   " + time.toFixed(3) + "s    "}</span>
						))}
						<p>Lap speed</p>
						{item?.lap_speed?.map((speed, index) => (
							<span key={index}>{index + 1 + ":    " + speed.toFixed(3) + "km/h    "}</span>
						))}
					</>
				))}
			</div>
		</div>
	);
};

export default InfoSection;
