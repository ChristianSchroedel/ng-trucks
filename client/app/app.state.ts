/**
 * Created by Christian Schrödel on 10.09.2016.
 */
import {LoadedEventsState} from './food-trucks/reducers/loaded-events.reducer';
import {Operator} from './food-trucks/services/foodtruck.service';

export interface AppState {
  loadedEvents: LoadedEventsState,
  loadedOperators: Operator[]
}
