/**
 * Created by Christian Schrödel on 07.09.2016.
 */
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LocationViewComponent} from './components/location-view/location-view.component';
import {RegionViewComponent} from './components/region-view/region-view.component';

const truckRoutes: Routes = ([
  {path: 'region/:regionName', component: RegionViewComponent},
  {path: 'location/:locationName', component: LocationViewComponent}
]);

export const truckRouting: ModuleWithProviders = RouterModule.forChild(truckRoutes);
