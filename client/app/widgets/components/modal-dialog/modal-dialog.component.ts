/**
 * Created by Christian Schrödel on 25.09.2016.
 */
import {Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'modal-dialog',
  templateUrl: 'modal-dialog.component.html',
  styleUrls: ['modal-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDialogComponent {
  @Input() showDialog: boolean;
  @Output() dismissDialog: EventEmitter<any> = new EventEmitter<any>();
}
