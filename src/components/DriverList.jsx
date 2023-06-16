import React from "react";
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

export const DriverList = ({ data }) => {
	return (
		<div className="p-6 space-y-3">
			<h1 className="text-gray-200 text-2xl font-semibold">Drivers list</h1>
			<div className="max-h-[336px] overflow-y-auto">
				{drivers.map((driver, index) => (
					<div
						key={driver.id}
						className="bg-[#393743] h-28 w-full border-b-[1px] border-gray-500 grid grid-cols-5 gap-6 p-4 px-8"
					>
						<div className="flex items-center justify-start gap-10 col-span-2">
							<span className="text-gray-300">{index}</span>
							<div className="w-20 aspect-[5/4] overflow-hidden">
								<img src={driver.img} alt="" className="w-full h-full object-cover" />
							</div>
							<p className="text-gray-200 flex items-center gap-2 text-2xl font-light">
								<span>{driver.name[0]}</span>
								<span className="font-semibold">{driver.name[1]}</span>
							</p>
						</div>
						<div className="col-span-3 flex items-center justify-evenly">
							<div className="text-center text-gray-300 space-y-2">
								<p className="uppercase text-sm">Current lap</p>
								<p className="text-gray-200 text-3xl font-semibold">
									{data?.find((item) => item.id === driver.id)?.current_lap ?? 0}
								</p>
							</div>
							<div className="relative">
								<div className="text-6xl font-bold opacity-30 text-gray-100 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
									{driver.id}
								</div>
								<img src={Images.car2} className="w-40 -mb-6 brightness-75 opacity-75" alt="" />
							</div>
						</div>
					</div>
				))}
				{drivers.map((driver, index) => (
					<div
						key={driver.id}
						className="bg-[#393743] h-28 w-full border-b-[1px] border-gray-500 grid grid-cols-5 gap-6 p-4 px-8"
					>
						<div className="flex items-center justify-start gap-10 col-span-2">
							<span className="text-gray-300">{index}</span>
							<div className="w-20 aspect-[5/4] overflow-hidden">
								<img src={driver.img} alt="" className="w-full h-full object-cover" />
							</div>
							<p className="text-gray-200 flex items-center gap-2 text-2xl font-light">
								<span>{driver.name[0]}</span>
								<span className="font-semibold">{driver.name[1]}</span>
							</p>
						</div>
						<div className="col-span-3 flex items-center">
							<div className="text-center text-gray-300 space-y-2">
								<p className="uppercase text-sm">Current lap</p>
								<p className="text-gray-200 text-3xl font-semibold">
									{data?.find((item) => item.id === driver.id)?.current_lap ?? 0}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
