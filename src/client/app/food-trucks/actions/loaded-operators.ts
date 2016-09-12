/**
 * Created by Christian Schrödel on 12.09.2016.
 */
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Operator} from '../services/foodtruck.service';

@Injectable()
export class LoadedOperatorsActions {
  static LOAD_OPERATORS_DONE = 'LOAD_OPERATORS_DONE';
  loadOperatorsDone(operators: Operator[]): Action {
    return {
      type: LoadedOperatorsActions.LOAD_OPERATORS_DONE,
      payload: operators
    };
  }
}
