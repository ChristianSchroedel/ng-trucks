/**
 * Created by Christian Schrödel on 28.09.2016.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {TruckLocation} from '../types';
import {LocationsActions} from '../actions';

export const locationsReducer: ActionReducer<TruckLocation[]> = ((state: TruckLocation[] = [], action: Action) => {
  switch (action.type) {
    case LocationsActions.LOAD_LOCATIONS_DONE:
      let loadedLocations: TruckLocation[] = action.payload;

      if (!loadedLocations) {
        return state;
      }

      loadedLocations = loadedLocations.filter((loadedLocation: TruckLocation) => {
        return undefined === state.find((location: TruckLocation) => {
            return location.name === loadedLocation.name;
          })
      });

      return [
        ...state,
        ...loadedLocations
      ];
    default:
      return state;
  }
});
