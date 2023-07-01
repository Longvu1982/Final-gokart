import React from "react";
import { useTrackInfoStore } from "../hooks/useTrackInfo";

const TrackDetails = () => {
	const trackInfo = useTrackInfoStore();
	return (
		<div className="flex items-center justify-between flex-wrap gap-y-6">
			<div className="flex gap-4 items-end">
				<div className="font-semibold text-gray-400 text-base xl:text-lg">
					<p className="-mb-1">NUMBER</p>
					<p>OF LAPS</p>
				</div>
				<span className="text-4xl -mb-1 xl:mb-0 xl:text-[50px] leading-[50px] font-semibold text-gray-100">{trackInfo.laps}</span>
			</div>
			<div className="flex gap-4 items-end">
				<div className="font-semibold text-gray-400 text-base xl:text-lg">
					<p className="-mb-1">CIRCUIT</p>
					<p>LENGTH</p>
				</div>
				<span className="text-4xl -mb-1 xl:mb-0 xl:text-[50px] leading-[50px] font-semibold text-gray-100">{trackInfo.length}</span>
				<span className="text-2xl font-semibold -ml-2 text-gray-100">KM</span>
			</div>
			<div className="flex gap-4 items-end">
				<div className="font-semibold text-gray-400 text-base xl:text-lg">
					<p className="-mb-1">TOTAL</p>
					<p>DISTANCE</p>
				</div>
				<span className="text-4xl -mb-1 xl:mb-0 xl:text-[50px] leading-[50px] font-semibold text-gray-100">
					{(trackInfo.laps * trackInfo.length)?.toFixed(1)}
				</span>
				<span className="text-2xl font-semibold -ml-2 text-gray-100">KM</span>
			</div>
		</div>
	);
};

export default TrackDetails;
