/**
 * Created by Christian Schrödel on 10.09.2016.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {TruckEvents} from '../types';
import {EventsActions} from '../actions';

export interface EventsState {
  loadedLocations: string[];
  events: TruckEvents[];
}

const initialState: EventsState = {
  loadedLocations: [],
  events: []
};

export const eventsReducer: ActionReducer<EventsState> = (state: EventsState = initialState, action: Action) => {
  switch (action.type) {
    case EventsActions.LOAD_EVENTS_FOR_LOCATION:
      let location: string = action.payload;

      if (state.loadedLocations.includes(location)) {
        return state;
      }

      return {
        loadedLocations: [...state.loadedLocations, location],
        events: state.events.slice()
      };
    case EventsActions.LOAD_EVENTS_FOR_LOCATION_DONE:
      let loadEvents: TruckEvents = action.payload;

      return {
        loadedLocations: state.loadedLocations.slice(),
        events: [
          ...state.events,
          {
            location: Object.assign({}, loadEvents.location),
            events: loadEvents.events.slice()
          }
        ]
      };
    default:
      return state;
  }
};
