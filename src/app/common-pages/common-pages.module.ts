/**
 * Created by Christian Schrödel on 23.09.2016.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {commonPageRouting} from './common-pages.routes';
import {ImpressumComponent} from './components/impressum/impressum.component';
import {DataPrivacyStatementComponent} from './components/dps/dps.component';
import {WidgetsModule} from '../widgets/widgets.module';

@NgModule({
  imports: [CommonModule, WidgetsModule, commonPageRouting],
  declarations: [ImpressumComponent, DataPrivacyStatementComponent]
})
export class CommonPagesModule {
}
