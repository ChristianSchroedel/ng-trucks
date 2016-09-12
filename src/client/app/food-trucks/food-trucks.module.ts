/**
 * Created by Christian Schrödel on 05.09.2016.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetsModule} from '../widgets/widgets.module';
import {truckRouting} from './food-trucks.routes';
import {TruckTourComponent} from './components/tour/truck-tour.component';
import {TruckLocationComponent} from './components/location/truck-location.component';
import {TruckDetailViewComponent} from './components/detail-view/truck-detail-view.component';
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
    TruckDetailViewComponent,
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
