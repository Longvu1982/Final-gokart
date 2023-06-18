import { create } from "zustand";

const useDriverStore = create((set) => ({
  drivers: [],
  addDriver: (newDriver) => {
    set((state) => {
      const cloneDriver = structuredClone(state.drivers);
      const existingDriverIndex = cloneDriver.findIndex(
        (driver) => driver.id === newDriver.id
      );
      console.log(existingDriverIndex)
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
