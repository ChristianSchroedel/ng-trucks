/**
 * Created by Christian Schrödel on 05.09.2016.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetsModule} from '../widgets/widgets.module';
import {truckRouting} from './food-trucks.routes';
import {TourComponent} from './components/push/tour/tour.component';
import {TourOverviewComponent} from './components/push/tour-overview/tour-overview.component';
import {TruckComponent} from './components/push/truck/truck.component';
import {TruckOverviewComponent} from './components/push/truck-overview/truck-overview.component';
import {LocationOverviewComponent} from './components/push/location-overview/location-overview.component';
import {LocationComponent} from './components/push/location/location.component';
import {LocationViewComponent} from './components/location-view/location-view.component';
import {RegionViewComponent} from './components/region-view/region-view.component';
import {FoodTruckService} from './services/foodtruck.service';
import {LoadedEventsActions} from './actions/loaded-events';
import {LoadedOperatorsActions} from './actions/loaded-operators';

@NgModule({
  imports: [CommonModule, WidgetsModule, truckRouting],
  declarations: [
    TourComponent,
    TourOverviewComponent,
    TruckComponent,
    TruckOverviewComponent,
    LocationComponent,
    LocationOverviewComponent,
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
