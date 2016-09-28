/**
 * Created by Christian Schrödel on 12.09.2016.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {OperatorsActions} from '../actions';
import {TruckLocation, Operator} from '../types';

export const operatorsReducer: ActionReducer<Operator[]> = (state: Operator[] = [], action: Action) => {
  switch (action.type) {
    case OperatorsActions.LOAD_OPERATORS_DONE:
      let loadedOperators: Operator[] = action.payload;

      if (!loadedOperators) {
        return state;
      }

      loadedOperators = loadedOperators.filter((newOperator: Operator) => {
        return undefined === state.find((operator: Operator) => {
            return operator.id === newOperator.id;
          });
      });

      return [
        ...state,
        ...loadedOperators
      ];
    case OperatorsActions.ADD_LOCATION:
      let operatorId: string = action.payload.operatorId;
      let location: TruckLocation = action.payload.location;

      let operator: Operator = state.find((operator: Operator) => operator.id === operatorId);

      if (!operator || !location) {
        return state;
      }

      let operatorLocations: TruckLocation[] = operator.locations || [];
      let foundLocation: TruckLocation = operatorLocations.find((opLocation: TruckLocation) => {
        return opLocation.name === location.name
      });

      if (foundLocation) {
        return state;
      } else {
        operator.locations = operatorLocations.concat(location);
      }

      return [...state];
    default:
      return state;
  }
};
