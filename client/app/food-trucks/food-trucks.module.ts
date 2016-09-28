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
import {FoodTruckService, LocationService} from './services';
import {EventsActions, OperatorsActions, LocationsActions} from './actions';

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
    LocationService,
    EventsActions,
    OperatorsActions,
    LocationsActions
  ]
})
export class FoodTrucksModule {
}
