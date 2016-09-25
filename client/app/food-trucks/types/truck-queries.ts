/**
 * Created by Christian Schrödel on 06.09.2016.
 */

export interface TruckQuery {
  date?:string;
  longitude: number;
  latitude: number;
  radius?: number;
}
