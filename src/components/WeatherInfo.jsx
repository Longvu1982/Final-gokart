import React, { useEffect, useState } from "react";
import { useTrackInfoStore } from "../hooks/useTrackInfo";
import {
	TiWeatherStormy,
	TiWeatherShower,
	TiWeatherDownpour,
	TiWeatherSnow,
	TiWeatherSunny,
	TiWeatherCloudy,
} from "react-icons/ti";
import { RiWindyFill } from "react-icons/ri";

const WeatherInfo = () => {
	const [isLoading, setLoading] = useState(false);
	const weatherConditions = [
		{
			main: "Thunderstorm",
			icon: <TiWeatherStormy size={60} />,
			iconColor: "gray",
		},
		{
			main: "Drizzle",
			icon: <TiWeatherShower size={60} />,
			iconColor: "blue",
		},
		{
			main: "Rain",
			icon: <TiWeatherDownpour size={60} />,
			iconColor: "blue",
		},
		{
			main: "Snow",
			icon: <TiWeatherSnow size={60} />,
			iconColor: "white",
		},
		{
			main: "Clear",
			icon: <TiWeatherSunny size={60} />,
			iconColor: "yellow",
		},
		{
			main: "Clouds",
			icon: <TiWeatherCloudy size={60} />,
			iconColor: "gray",
		},
		{
			main: "Other Atmosphere",
			icon: <TiWeatherCloudy size={60} />,
			iconColor: "gray",
		},
	];

	const [weatherData, setWeatherData] = useState(null);

	const trackInfo = useTrackInfoStore();

	const getCurrentWeatherIcon = () => {
		const currentWeatherData = weatherConditions.find((item) => item.main === weatherData?.weather?.[0]?.main);
		return (
			<div className="flex items-center justify-center" style={{ color: currentWeatherData?.iconColor }}>
				{currentWeatherData?.icon}
			</div>
		);
	};

	useEffect(() => {
		const fetchWeatherData = async () => {
			const apiKey = "cc3f30d21268a3d5e433058a1d191dcc";
			const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${trackInfo.area}&appid=${apiKey}`;

			try {
				setLoading(true);
				const response = await fetch(apiUrl);
				if (response.ok) {
					const data = await response.json();
					setWeatherData(data);
				} else {
					throw new Error("Failed to fetch weather data");
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchWeatherData();
	}, [trackInfo.area]);
	return (
		<div className="bg-[#2f2c36] col-span-3 p-4 px-2 flex items-center flex-col">
			<p className="text-gray-400 font-semibold text-center text-lg uppercase">{trackInfo.area}</p>
			{isLoading ? (
				<div className="flex items-center justify-center flex-1">
					<div className="loader"> </div>
				</div>
			) : (
				<div className="flex flex-col items-center gap-2 justify-center flex-1 py-2">
					{getCurrentWeatherIcon()}
					<p className="text-gray-300 font-bold text-xl">
						{weatherData?.main?.temp ? (weatherData?.main?.temp - 273)?.toFixed(2) + "°C" : ""}
					</p>
					<RiWindyFill size={60} className="text-blue-300" />
					<p className="text-gray-300 font-bold text-xl">
						{weatherData?.main?.temp ? (weatherData?.wind?.speed * 3.6)?.toFixed(2) + "km/h" : ""}
					</p>
				</div>
			)}
		</div>
	);
};

export default WeatherInfo;
