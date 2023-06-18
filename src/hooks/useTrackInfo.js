import { create } from "zustand";

// Create a Zustand store for trackInfo
export const useTrackInfoStore = create((set) => ({
  name: "",
  area: "",
  description: "",
  setTrackInfo: (newTrackInfo) => set(() => newTrackInfo ),
}));
