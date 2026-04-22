import { useState, type ReactNode } from "react";

import { LocationContext } from "@/context/location/context";
import type { Location as LocationType} from "@/lib/types";

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [location, setLocation] = useState<LocationType | null>(null);

   return (
     <LocationContext.Provider
       value={{
         location,
         setLocation,
       }}
     >
       {children}   
     </LocationContext.Provider>
   );
 };
 
 export default LocationProvider;
