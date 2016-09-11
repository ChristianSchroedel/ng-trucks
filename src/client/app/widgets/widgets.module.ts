/**
 * Created by Christian Schrödel on 06.09.2016.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from './components/logo/logo.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LogoComponent],
  exports: [LogoComponent]
})
export class WidgetsModule {
}
