/**
 * Created by Christian Schrödel on 12.09.2016.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {Operator} from '../services/foodtruck.service';
import {LoadedOperatorsActions} from '../actions/loaded-operators';

export const loadedOperatorsReducer: ActionReducer<Operator[]> = (state: Operator[] = [], action: Action) => {
  switch (action.type) {
    case LoadedOperatorsActions.LOAD_OPERATORS_DONE:
      let loadedOperators: Operator[] = action.payload;

      loadedOperators = loadedOperators.filter((newOperator: Operator) => {
        return undefined === state.find((operator: Operator) => {
            return operator.id === newOperator.id;
          });
      });

      return [
        ...state,
        ...loadedOperators
      ];
    default:
      return state;
  }
};
