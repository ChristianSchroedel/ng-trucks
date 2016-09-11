/**
 * Created by Christian Schrödel on 10.09.2016.
 */
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {TruckLocation} from '../types/truck-locations';
import {TruckEvents} from '../types/truck-events';

@Injectable()
export class LoadedTrucksActions {
  static LOAD_LOCATION = 'LOAD_LOCATION';
  loadLocation(location: TruckLocation): Action {
    return {
      type: LoadedTrucksActions.LOAD_LOCATION,
      payload: location
    };
  }

  static LOAD_LOCATION_DONE = 'LOAD_LOCATION_DONE';
  loadLocationDone(events: TruckEvents): Action {
    return {
      type: LoadedTrucksActions.LOAD_LOCATION_DONE,
      payload: events
    };
  }
}
