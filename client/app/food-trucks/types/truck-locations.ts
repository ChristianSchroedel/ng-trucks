import {Colors} from './utils';
/**
 * Created by Christian Schrödel on 10.09.2016.
 */

export const LOCATION_ER_GUENTHER_SCHAROWSKY_STRASSE: TruckLocation = {
  name: 'ER-Günther-Scharowsky-Straße',
  region: 'nürnberg',
  geoLocation: {latitude: 49.5743556, longitude: 10.998697}
};
export const LOCATION_ER_ROETHELHEIMPARK: TruckLocation = {
  name: 'ER-Röthelheimpark',
  region: 'nürnberg',
  geoLocation: {latitude: 49.5928416, longitude: 11.0250335}
};
export const LOCATION_ER_TENNENLOHE: TruckLocation = {
  name: 'ER-Tennenlohe',
  region: 'nürnberg',
  geoLocation: {latitude: 49.54475, longitude: 11.0223013}
};
export const LOCATION_FUE_WUERZBURGER_STRASSE: TruckLocation = {
  name: 'FÜ-Würzburger-Strasse',
  region: 'nürnberg',
  geoLocation: {latitude: 49.4834389, longitude: 10.9596899}
};
export const LOCATION_N_FRANKENSTRASSE: TruckLocation = {
  name: 'N-Frankenstrasse',
  region: 'nürnberg',
  geoLocation: {latitude: 49.4295962, longitude: 11.0824009}
};
export const LOCATION_N_MARIENBERG: TruckLocation = {
  name: 'N-Marienberg',
  region: 'nürnberg',
  geoLocation: {latitude: 49.4869373, longitude: 11.0935294}
};
export const LOCATION_N_MILCHHOF_PALAIS: TruckLocation = {
  name: 'N-Milchhof-Palais',
  region: 'nürnberg',
  geoLocation: {latitude: 49.4495614, longitude: 11.0969089}
};
export const LOCATION_N_NORDOSTPARK: TruckLocation = {
  name: 'N-Nordostpark',
  region: 'nürnberg',
  geoLocation: {latitude: 49.4876925, longitude: 11.1119348}
};
export const LOCATION_N_THOMAS_MANN_STRASSE: TruckLocation = {
  name: 'N-Thomas-Mann-Straße',
  region: 'nürnberg',
  geoLocation: {latitude: 49.4100421, longitude: 11.1294845}
};

export const locationsNuremberg: TruckLocation[] = [
  LOCATION_ER_GUENTHER_SCHAROWSKY_STRASSE,
  LOCATION_ER_ROETHELHEIMPARK,
  LOCATION_ER_TENNENLOHE,
  LOCATION_FUE_WUERZBURGER_STRASSE,
  LOCATION_N_FRANKENSTRASSE,
  LOCATION_N_MARIENBERG,
  LOCATION_N_MILCHHOF_PALAIS,
  LOCATION_N_NORDOSTPARK,
  LOCATION_N_THOMAS_MANN_STRASSE
];

export const locations: TruckLocation[] = [
  ...locationsNuremberg
];

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
