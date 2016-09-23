/**
 * Created by Christian Schrödel on 23.09.2016.
 */
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ImpressumComponent} from './components/impressum/impressum.component';
import {DataPrivacyStatementComponent} from './components/dps/dps.component';

const commonPageRoutes: Routes = ([
  {path: 'impressum', component: ImpressumComponent},
  {path: 'dps', component: DataPrivacyStatementComponent}
]);

export const commonPageRouting: ModuleWithProviders = RouterModule.forChild(commonPageRoutes);
