/**
 * Created by Christian Schrödel on 10.09.2016.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {TruckEvents} from '../types/truck-events';
import {LoadedEventsActions} from '../actions/loaded-events';

export interface LoadedEventsState {
  loadedLocations: string[];
  events: TruckEvents[];
}

const initialState: LoadedEventsState = {
  loadedLocations: [],
  events: []
};

export const loadedEventsReducer: ActionReducer<LoadedEventsState> = (state: LoadedEventsState = initialState, action: Action) => {
  switch (action.type) {
    case LoadedEventsActions.LOAD_LOCATION:
      let location: string = action.payload;

      if (state.loadedLocations.includes(location)) {
        return state;
      }

      return {
        loadedLocations: [...state.loadedLocations, location],
        events: state.events.slice()
      };
    case LoadedEventsActions.LOAD_LOCATION_DONE:
      let loadEvents: TruckEvents = action.payload;

      return {
        loadedLocations: state.loadedLocations.slice(),
        events: [
          ...state.events,
          {
            longitude: loadEvents.longitude,
            latitude: loadEvents.latitude,
            locationName: loadEvents.locationName,
            events: loadEvents.events.slice()
          }
        ]
      };
    default:
      return state;
  }
};
