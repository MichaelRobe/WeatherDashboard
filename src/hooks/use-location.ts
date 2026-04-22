import { useContext } from "react";
import { LocationContext } from "@/context/location/context";

export function useLocationContext() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }

  return context;
};