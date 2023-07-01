import React, { useEffect, useState } from "react";
import Images from "../assets/images/Image";
import { BsChevronRight, BsHexagon } from "react-icons/bs";
import { useTrackInfoStore } from "../hooks/useTrackInfo";
import useDriverStore from "../hooks/useDriverInfo";

const Form = ({ setStep }) => {
	const [trackName, setTrackName] = useState("");
	const [area, setArea] = useState("");
	const [laps, setLaps] = useState(0);
	const [length, setLength] = useState(0);
	const [trackDescription, setTrackDescription] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [id, setId] = useState(0);
	const [img, setImg] = useState("");

	const trackInfo = useTrackInfoStore();

	const drivers = useDriverStore();

	const handleClickNextStep = () => {
		const newTrackInfo = {
			name: trackName,
			area: area,
			description: trackDescription,
		};
		trackInfo.setTrackInfo(newTrackInfo);

		setStep((prev) => prev + 1);
	};

	const handleFileSelect = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = function (e) {
			const imgDataUrl = e.target.result;
			setImg(imgDataUrl);
		};

		reader.readAsDataURL(file);
	};

	const handleChooseImage = () => {
		const input = document.createElement("input");
		input.type = "file";

		input.click();

		input.addEventListener("change", handleFileSelect);
	};

	const handleAddDriver = () => {
		const newDriver = {
			name: [firstName, lastName],
			id: Number(id),
			img: img,
		};
		drivers.addDriver(newDriver);
	};

	useEffect(() => {
		setTrackName(trackInfo.name);
		setLaps(trackInfo.laps);
		setLength(trackInfo.length);
		setTrackDescription(trackInfo.description);
		setArea(trackInfo.area);
	}, [trackInfo.name, trackInfo.laps, trackInfo.length, trackInfo.description, trackInfo.area]);

	return (
		<div className="w-full h-[calc(100vh-84px)] overflow-y-auto bg-[#2f2c36] text-white relative">
			<div className="absolute inset-0 pointer-events-none opacity-30">
				<img src={Images.gokartBg} className="w-full h-full object-cover" alt="" />
			</div>
			<div className="absolute inset-0 px-6 py-10">
				<p className="text-center text-2xl font-semibold uppercase mb-20">Fill in the info</p>
				<div className="max-w-[1600px] containter mx-auto">
					<div className="grid grid-rows-2 xl:grid-rows-1 xl:grid-cols-2 gap-10">
						<div className="flex flex-col gap-10">
							<p className="text-center font-semibold text-lg">Add basic track infomation</p>
							<div className="grid grid-cols-3 gap-1">
								<div className="flex flex-col gap-4">
									<p className="">Track name:</p>
									<input
										value={trackName}
										onChange={(e) => setTrackName(e.target.value)}
										type="text"
										className="bg-transparent outline-none border-2 rounded-md p-2 border-gray-400"
									/>
								</div>
								<div className="flex flex-col gap-4">
									<p className="">Number of laps:</p>
									<input
										value={laps}
										onChange={(e) => setLaps(Number(e.target.value))}
										type="number"
										step={1}
										className="bg-transparent outline-none border-2 rounded-md p-2 border-gray-400"
									/>
								</div>
								<div className="flex flex-col gap-4">
									<p className="">Track length:</p>
									<input
										value={length}
										onChange={(e) => setLength(Number(e.target.value))}
										type="number"
										step={0.1}
										className="bg-transparent outline-none border-2 rounded-md p-2 border-gray-400"
									/>
								</div>
							</div>

							<div className="flex flex-col gap-4">
								<p className="">Area (For OpenWeather API):</p>
								<input
									value={area}
									onChange={(e) => setArea(e.target.value)}
									type="text"
									className="bg-transparent outline-none border-2 rounded-md p-2 border-gray-400"
								/>
							</div>
							<div className="flex flex-col gap-4">
								<p className="">Track description:</p>
								<textarea
									value={trackDescription}
									onChange={(e) => setTrackDescription(e.target.value)}
									type="text"
									className="bg-transparent outline-none border-2 rounded-md p-2 border-gray-400"
									rows={6}
								/>
							</div>
						</div>
						<div>
							<div className="flex flex-col gap-10">
								<p className="text-center font-semibold text-lg">Add a driver</p>
								<div className="flex">
									<div className="grid md:grid-flow-col grid-cols-2 md:grid-cols-4 gap-1 items-center justify-between">
										<div className="flex flex-col gap-4">
											<p className="">First name:</p>
											<input
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
												type="text"
												className="min-w-0 bg-transparent outline-none border-2 rounded-md p-2 border-gray-400"
											/>
										</div>
										<div className="flex flex-col gap-4">
											<p className="">Last name:</p>
											<input
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
												type="text"
												className="min-w-0 bg-transparent outline-none border-2 rounded-md p-2 border-gray-400"
											/>
										</div>
										<div className="flex flex-col gap-4">
											<p className="">Car ID</p>
											<input
												value={id}
												onChange={(e) => setId(Number(e.target.value))}
												type="number"
												min={0}
												step={1}
												className="min-w-0 bg-transparent outline-none border-2 rounded-md p-2 border-gray-400"
											/>
										</div>
										<div className="flex flex-col gap-4">
											<p className="">Driver Image</p>
											<div
												onClick={handleChooseImage}
												className="min-w-0 bg-transparent outline-none border-2 rounded-md p-2 border-gray-400 text-center flex items-center justify-center hover:opacity-70 transition-all cursor-pointer"
											>
												Choose image
											</div>
										</div>
									</div>
									<div onClick={handleAddDriver} className="flex flex-col gap-4 ml-1">
										<p className="">Action</p>
										<div className="p-3 border-2 rounded-md text-xs hover:opacity-70 transition-all cursor-pointer">
											ADD
										</div>
									</div>
								</div>
								<div className="bg-slate-800 bg-opacity-60 flex flex-col max-h-[350px] overflow-y-auto mb-6">
									{drivers.drivers?.map((item, index) => (
										<div
											key={item.id}
											className="flex items-center justify-between hover:bg-slate-700 hover:bg-opacity-40 transition-all py-3 px-6"
										>
											<div className="flex items-center gap-10">
												<p>{index + 1}</p>
												<img src={item.img} className="w-10" alt="" />
												<p className="flex items-center gap-2 w-[200px] shink-0 grow-0 whitespace-nowrap text-ellipsis overflow-hidden">
													<span>{item?.name?.[0]}</span>
													<span className="font-semibold text-ellipsis overflow-hidden">{item?.name?.[1]}</span>
												</p>
												<p>{item.id}</p>
											</div>
											<p
												onClick={() => {
													drivers.removeDriver(item.id);
												}}
												className="ml-10 cursor-pointer hover:text-red-600"
											>
												Remove
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-end">
						<div
							onClick={handleClickNextStep}
							className="mb-4 xl:mb-0 flex items-center justify-center relative p-1 group cursor-pointer"
						>
							<BsHexagon size={50} className="text-white group-hover:opacity-50 trasition-all" />
							<BsChevronRight size={15} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
							<p className="hidden xl:block absolute top-1/2 left-16 whitespace-nowrap -translate-y-1/2 w-0 group-hover:w-28 transition-all overflow-hidden">
								Next page
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Form;
