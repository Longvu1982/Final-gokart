import React from "react";
import Images from "../assets/images/Image";
import { useTrackInfoStore } from "../hooks/useTrackInfo";

const Header = () => {
	const trackInfo = useTrackInfoStore()
	return (
		<div className="w-full bg-[#484650] flex justify-between p-4 px-6 items-center">
			<div className="flex flex-col">
				<h1 className="text-white text-xl font-semibold">GOKART RACING GRAND PRIX 2023</h1>
				<p className="text-gray-300 text-base font-semibold h-6 opacity-40">{trackInfo.name ?? "Ultimate system"}</p>
			</div>
			<img src={Images.logo3} className="w-14 brightness-150" alt="logo" />
		</div>
	);
};

export default Header;
