/**
 * Created by developer on 24.08.2016.
 */
import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';
import {appRoutingProviders, routing} from './app.routes';
import {MainComponent} from './app.component';
import {FoodTrucksModule} from './food-trucks/food-trucks.module';
import {loadedEventsReducer} from './food-trucks/reducers/loaded-events.reducer';
import {loadedOperatorsReducer} from './food-trucks/reducers/loaded-operators.reducer';
import {WidgetsModule} from './widgets/widgets.module';
import {CommonPagesModule} from './common-pages/common-pages.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    StoreModule.provideStore({
      loadedEvents: loadedEventsReducer,
      loadedOperators: loadedOperatorsReducer
    }),
    FoodTrucksModule,
    WidgetsModule,
    CommonPagesModule
  ],
  declarations: [MainComponent],
  providers: [
    appRoutingProviders,
    {provide: LOCALE_ID, useValue: 'de-DE'}
  ],
  bootstrap: [MainComponent]
})
export class MainModule {
}
