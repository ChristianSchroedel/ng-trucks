/**
 * Created by Christian Schrödel on 13.09.2016.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {ScreenActions} from '../actions/screen';
import {REGION_NUREMBERG} from '../food-trucks/types/truck-regions';

export enum SCREEN {
  REGION_VIEW,
  LOCATION_VIEW,
  TRUCK_VIEW
}

export interface ScreenState {
  screen: SCREEN,
  title: string
}

const initialScreen: ScreenState = {
  screen: SCREEN.REGION_VIEW,
  title: REGION_NUREMBERG.name
};

export const screenReducer: ActionReducer<ScreenState> = (state: ScreenState = initialScreen, action: Action) => {
  switch (action.type) {
    case ScreenActions.SET_CURRENT_SCREEN:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};
