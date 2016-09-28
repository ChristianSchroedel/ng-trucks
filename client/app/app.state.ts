/**
 * Created by Christian Schrödel on 10.09.2016.
 */
import {EventsState} from './food-trucks/reducers/events.reducer';
import {Operator} from './food-trucks/types';

export interface AppState {
  events: EventsState,
  operators: Operator[]
}
