import React from "react";
import Images from "../assets/images/Image";
import { IoIosArrowBack } from "react-icons/io";
import { useTrackInfoStore } from "../hooks/useTrackInfo";

const Header = ({ step, setStep }) => {
	const trackInfo = useTrackInfoStore();
	return (
		<div className="w-full bg-[#484650] flex justify-between p-4 px-6 items-center">
			<div className="flex items-center gap-3">
				{step > 1 && (
					<div
						onClick={() => {
							setStep((prev) => prev - 1);
						}}
						className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-slate-900 hover:bg-opacity-20 transition-all cursor-pointer"
					>
						<IoIosArrowBack size={20} className="text-gray-200" />
					</div>
				)}
				<div className="flex flex-col">
					<h1 className="text-white text-xl font-semibold">GOKART RACING GRAND PRIX 2023</h1>
					<p className="text-gray-300 text-base font-semibold h-6 opacity-40">{trackInfo.name ?? "Ultimate system"}</p>
				</div>
			</div>
			<img src={Images.logo3} className="w-14 brightness-150" alt="logo" />
		</div>
	);
};

export default Header;
