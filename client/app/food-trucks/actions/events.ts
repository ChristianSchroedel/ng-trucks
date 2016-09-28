/**
 * Created by Christian Schrödel on 10.09.2016.
 */
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {TruckEvents} from '../types';

@Injectable()
export class EventsActions {
  static LOAD_EVENTS_FOR_LOCATION = 'LOAD_EVENTS_FOR_LOCATION';
  loadEventsForLocation(location: string): Action {
    return {
      type: EventsActions.LOAD_EVENTS_FOR_LOCATION,
      payload: location
    };
  }

  static LOAD_EVENTS_FOR_LOCATION_DONE = 'LOAD_EVENTS_FOR_LOCATION_DONE';
  loadEventsForLocationDone(events: TruckEvents): Action {
    return {
      type: EventsActions.LOAD_EVENTS_FOR_LOCATION_DONE,
      payload: events
    };
  }
}
