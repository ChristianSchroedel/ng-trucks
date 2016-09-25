/**
 * Created by Christian Schrödel on 06.09.2016.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from './components/logo/logo.component';
import {ModalDialogComponent} from './components/modal-dialog/modal-dialog.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LogoComponent, ModalDialogComponent],
  exports: [LogoComponent, ModalDialogComponent]
})
export class WidgetsModule {
}
