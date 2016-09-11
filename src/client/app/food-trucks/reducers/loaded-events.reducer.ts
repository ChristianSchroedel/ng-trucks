/**
 * Created by Christian Schrödel on 10.09.2016.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {TruckEvents} from '../types/truck-events';
import {LoadedTrucksActions} from '../actions/loaded-trucks';

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
    case LoadedTrucksActions.LOAD_LOCATION_DONE:
      let loadEvents: TruckEvents = action.payload;

      if (state.loadedLocations.includes(loadEvents.locationName)) {
        return state;
      }

      return {
        loadedLocations: [...state.loadedLocations, loadEvents.locationName],
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
