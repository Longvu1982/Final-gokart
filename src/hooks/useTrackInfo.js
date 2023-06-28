import { create } from "zustand";

// Create a Zustand store for trackInfo
export const useTrackInfoStore = create((set) => ({
	name: "BigC Thang Long",
	area: "Hanoi",
	description:
		"Experience high-speed thrills at Big C Thang Long's exciting go-kart race court in Hanoi, Vietnam. With a challenging track and top-notch equipment, it's the perfect destination for adrenaline junkies seeking a thrilling racing experience. Race, compete, and feel the rush at Big C Thang Long!",
	laps: 9,
	length: 0.6,
	setTrackInfo: (newTrackInfo) => set(() => newTrackInfo),
}));
