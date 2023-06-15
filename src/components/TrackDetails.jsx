import React from "react";

const TrackDetails = () => {
	return (
		<div className="flex items-center justify-between my-10 flex-wrap gap-y-6">
			<div className="flex gap-4 items-end">
				<div className="font-semibold text-gray-400 text-xl">
					<p className="-mb-1">NUMBER</p>
					<p>OF LAPS</p>
				</div>
				<span className="text-6xl font-semibold text-gray-100">3</span>
			</div>
			<div className="flex gap-4 items-end">
				<div className="font-semibold text-gray-400 text-xl">
					<p className="-mb-1">CIRCUIT</p>
					<p>LENGTH</p>
				</div>
				<span className="text-6xl font-semibold text-gray-100">2.3</span>
				<span className="text-2xl font-semibold -ml-2 text-gray-100">KM</span>
			</div>
			<div className="flex gap-4 items-end">
				<div className="font-semibold text-gray-400 text-xl">
					<p className="-mb-1">TOTAL</p>
					<p>DISTANCE</p>
				</div>
				<span className="text-6xl font-semibold text-gray-100">6.9</span>
				<span className="text-2xl font-semibold -ml-2 text-gray-100">KM</span>
			</div>
		</div>
	);
};

export default TrackDetails;
