/**
 * Created by Christian Schrödel on 13.09.2016.
 */
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {ScreenState} from '../reducers/screen.reducer';

@Injectable()
export class ScreenActions {
  static SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN';
  setCurrentScreen(nextScreen: ScreenState): Action {
    return {
      type: ScreenActions.SET_CURRENT_SCREEN,
      payload: nextScreen
    };
  }
}
