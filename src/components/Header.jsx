import React from "react";
import Images from "../assets/images/Image";

const Header = () => {
	return (
		<div className="w-full bg-[#484650] flex justify-between p-4 px-6 items-center">
			<div className="flex flex-col">
				<h1 className="text-white text-xl font-semibold">GOKART RACING GRAND PRIX 2023</h1>
				<p className="text-gray-300 text-base font-semibold">BigC Long Bien</p>
			</div>
			<img src={Images.logo3} className="w-14 brightness-150" alt="logo" />
		</div>
	);
};

export default Header;
