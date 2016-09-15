/**
 * Created by developer on 24.08.2016.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';
import {appRoutingProviders, routing} from './app.routes';
import {MainComponent} from './app.component';
import {FoodTrucksModule} from './food-trucks/food-trucks.module';
import {loadedEventsReducer} from './food-trucks/reducers/loaded-events.reducer';
import {loadedOperatorsReducer} from './food-trucks/reducers/loaded-operators.reducer';
import {ScreenActions} from './actions/screen';
import {screenReducer} from './reducers/screen.reducer';
import {WidgetsModule} from './widgets/widgets.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    StoreModule.provideStore({
      loadedEvents: loadedEventsReducer,
      loadedOperators: loadedOperatorsReducer,
      currentScreen: screenReducer
    }),
    FoodTrucksModule,
    WidgetsModule
  ],
  declarations: [MainComponent],
  providers: [
    appRoutingProviders,
    ScreenActions
  ],
  bootstrap: [MainComponent]
})
export class MainModule {
}
