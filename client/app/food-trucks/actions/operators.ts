/**
 * Created by Christian Schrödel on 12.09.2016.
 */
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {TruckLocation, Operator} from '../types';

@Injectable()
export class OperatorsActions {
  static LOAD_OPERATORS_DONE = 'LOAD_OPERATORS_DONE';
  loadOperatorsDone(operators: Operator[]): Action {
    return {
      type: OperatorsActions.LOAD_OPERATORS_DONE,
      payload: operators
    };
  }

  static ADD_LOCATION = 'ADD_LOCATION';
  addLocation(operatorId: string, location: TruckLocation): Action {
    return {
      type: OperatorsActions.ADD_LOCATION,
      payload: {
        operatorId,
        location
      }
    }
  }
}
