/**
 * Created by Christian Schrödel on 07.09.2016.
 */
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const appRoutes: Routes = [
  {path: '', redirectTo: 'region/Nürnberg', pathMatch: 'full'}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
