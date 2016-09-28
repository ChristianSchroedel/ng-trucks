/**
 * Created by Christian Schrödel on 28.09.2016.
 */
import {Colors} from './utils';
import {TruckLocation} from './truck-locations';

export interface Operator {
  id: string;
  name: string;
  nameShort: string;
  description: string;
  url: string;
  offer: string;
  region: string;
  logo: string;
  impressions: string[];
  colors: Colors;
  premium: boolean;
  name_url: string;
  locations?: TruckLocation[];
}
