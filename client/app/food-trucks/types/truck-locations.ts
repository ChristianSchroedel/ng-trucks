/**
 * Created by Christian Schrödel on 10.09.2016.
 */
import {Colors} from './utils';

export interface TruckLocation {
  name: string;
  region: string;
  geoLocation: GeoLocation;
}

interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface Location {
  name: string;
  street: string;
  number: string;
  zipcode: string;
  city: string;
  sponsor: string;
  map: Map;
}

export interface Map {
  longitude: string;
  latitude: string;
  icon: string;
  colors: Colors;
}
