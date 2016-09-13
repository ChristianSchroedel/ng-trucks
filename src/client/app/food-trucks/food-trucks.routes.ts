/**
 * Created by Christian Schrödel on 07.09.2016.
 */
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TruckViewComponent} from './components/truck-view/truck-view.component';
import {LocationViewComponent} from './components/location-view/location-view.component';
import {RegionViewComponent} from './components/region-view/region-view.component';

const truckRoutes: Routes = ([
  {path: 'region/:regionName', component: RegionViewComponent},
  {path: 'location/:locationName', component: LocationViewComponent},
  {path: 'truck/:operatorId', component: TruckViewComponent}
]);

export const truckRouting: ModuleWithProviders = RouterModule.forChild(truckRoutes);
