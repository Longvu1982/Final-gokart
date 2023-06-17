import React, { useMemo } from "react";
import Images from "../assets/images/Image";

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

const getDriverById = (id) => {
	const driver = drivers.find((item) => item.id === id);
	if (driver) return driver;
	return {};
};

const TopInfo = ({ data }) => {
	const sortedLaptime = useMemo(
		() => structuredClone(data)?.sort((a, b) => Math.min(...a.lap_time) - Math.min(...b.lap_time)),
		[data]
	);

	const sortedLapSpeed = useMemo(
		() => structuredClone(data)?.sort((a, b) => Math.max(...b.lap_speed) - Math.max(...a.lap_speed)),
		[data]
	);

	const renderLeadingDriver = (purposeArr, id) => {
		let driver;
		if (purposeArr?.length === 0) driver = { name: "", img: "", id: -1 };
		else driver = getDriverById(id);
		return (
			<div className="flex flex-col items-center gap-6 w-2/5 shrink-0 grow-0 pb-2">
				<h1 className="text-gray-200 font-semibold text-xl">LEADING</h1>
				<div className="w-full aspect-[5/4] overflow-hidden relative">
					{driver.img ? (
						<img src={driver.img} alt="" srcset="" className="w-full h-full object-cover" />
					) : (
						<div className="absolute inset-0">
							<img src={Images.avtPlaceholder2} alt="" srcset="" className="w-full h-full object-cover breath" />
						</div>
					)}
				</div>
				{driver?.name?.[0] ? (
					<h1 className="text-gray-200 flex items-center gap-2 text-2xl transition-all font-light">
						<span>{driver?.name?.[0] ?? "..."}</span>
						<span className="font-semibold">{driver?.name?.[1]}</span>
					</h1>
				) : (
					<div className="h-[32px] flex items-end justify-center gap-3">
						<span className="loader"></span>
						<span className="text-white breath">pending...</span>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="grid grid-cols-2 gap-6 p-6 px-12 pt-12">
			<div className="w-full bg-[#393743] p-4">
				<div className="flex justify-between">
					{renderLeadingDriver(sortedLaptime?.[0]?.lap_time, sortedLaptime?.[0]?.id)}
					<div className="flex flex-col items-center gap-6 mr-3">
						<h1 className="text-gray-200 font-semibold text-xl">Top 3 Lap time</h1>
						<div className="flex flex-col gap-2">
							{sortedLaptime?.map((item, index) => (
								<p key={item.id} className="flex flex-col items-center gap-1">
									<span className="text-gray-400 text-lg">{`Top ${index + 1}`}</span>
									<span className="text-gray-200 text-xl font-semibold">
										{item.lap_time?.length > 0 ? Math.min(...item.lap_time)?.toFixed(2) + "s" : "..."}
									</span>
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="w-full bg-[#393743] p-4">
				<div className="flex justify-between">
					{renderLeadingDriver(sortedLapSpeed?.[0]?.lap_time, sortedLapSpeed?.[0]?.id)}
					<div className="flex flex-col items-center gap-6 mr-3">
						<h1 className="text-gray-200 font-semibold text-xl">Top 3 Speed</h1>
						<div className="flex flex-col gap-2">
							{sortedLapSpeed?.map((item, index) => (
								<p key={item.id} className="flex flex-col items-center gap-1">
									<span className="text-gray-400 text-lg">{`Top ${index + 1}`}</span>
									<span className="text-gray-200 text-xl font-semibold">
										{item.lap_speed?.length > 0 ? Math.max(...item.lap_speed)?.toFixed(2) + " km/h" : "..."}
									</span>
								</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopInfo;
