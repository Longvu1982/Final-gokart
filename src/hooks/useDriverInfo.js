import { create } from "zustand";
import Images from "../assets/images/Image";

const useDriverStore = create((set) => ({
	drivers: [
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
	],
	addDriver: (newDriver) => {
		set((state) => {
			const cloneDriver = structuredClone(state.drivers);
			const existingDriverIndex = cloneDriver.findIndex((driver) => driver.id === newDriver.id);
			console.log(existingDriverIndex);
			if (existingDriverIndex >= 0) {
				cloneDriver[existingDriverIndex] = newDriver;
			} else cloneDriver.push(newDriver);
			return { drivers: structuredClone(cloneDriver) };
		});
	},
	removeDriver: (driverId) => {
		set((state) => ({
			drivers: state.drivers.filter((driver) => driver.id !== driverId),
		}));
	},
}));

export default useDriverStore;
