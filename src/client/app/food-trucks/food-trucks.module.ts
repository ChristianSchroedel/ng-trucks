/**
 * Created by Christian Schrödel on 05.09.2016.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetsModule} from '../widgets/widgets.module';
import {truckRouting} from './food-trucks.routes';
import {TruckTourComponent} from './components/tour/truck-tour.component';
import {TruckLocationComponent} from './components/location/truck-location.component';
import {TruckViewComponent} from './components/truck-view/truck-view.component';
import {LocationViewComponent} from './components/location-view/location-view.component';
import {RegionViewComponent} from './components/region-view/region-view.component';
import {FoodTruckService} from './services/foodtruck.service';
import {LoadedEventsActions} from './actions/loaded-events';
import {LoadedOperatorsActions} from './actions/loaded-operators';

@NgModule({
  imports: [CommonModule, WidgetsModule, truckRouting],
  declarations: [
    TruckTourComponent,
    TruckLocationComponent,
    TruckViewComponent,
    LocationViewComponent,
    RegionViewComponent
  ],
  providers: [
    FoodTruckService,
    LoadedEventsActions,
    LoadedOperatorsActions
  ]
})
export class FoodTrucksModule {
}
