import { createContext } from 'react';
import type { Location } from '@/lib/types';


export type LocationContextType = {
  location: Location | null;
  setLocation: (location: Location) => void;
};

export const LocationContext = createContext<LocationContextType | undefined>(undefined);