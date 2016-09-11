/**
 * Created by Christian Schrödel on 06.09.2016.
 */
import {TruckLocation, locationsNuremberg} from './truck-locations';

export const REGION_NUREMBERG: Region = {
  name: 'Nürnberg',
  truckLocations: locationsNuremberg
};

export const regionsGermany: Region[] = [
  REGION_NUREMBERG
];

export const getRegion = (regionName: string): Region => {
  return regionsGermany.find((region: Region) => region.name === regionName);
};

export interface Region {
  name: string;
  truckLocations: TruckLocation[];
}
