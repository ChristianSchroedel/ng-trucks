/**
 * Created by Christian Schrödel on 28.09.2016.
 */
import {Injectable} from '@angular/core';
import {TruckLocation} from '../types';

@Injectable()
export class LocationsActions {
  static LOAD_LOCATIONS_DONE = 'LOAD_LOCATIONS_DONE';
  loadLocationsDone(locations: TruckLocation[]) {
    return {
      type: LocationsActions.LOAD_LOCATIONS_DONE,
      payload: locations
    }
  }
}
