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

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    StoreModule.provideStore({
      loadedEvents: loadedEventsReducer
    }),
    FoodTrucksModule
  ],
  declarations: [MainComponent],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [MainComponent]
})
export class MainModule {
}
