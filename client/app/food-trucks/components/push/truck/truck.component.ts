/**
 * Created by Christian Schrödel on 13.09.2016.
 */

import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Output} from '@angular/core';
import {TruckLocation, Operator} from '../../../types';

@Component({
  selector: 'truck',
  templateUrl: 'truck.component.html',
  styleUrls: ['./truck.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TruckComponent {
  @Input() operator: Operator;
  @Input() showDetails: boolean;
  @Output() logoClicked: EventEmitter<Operator> = new EventEmitter<Operator>();
  @Output() locationClicked: EventEmitter<TruckLocation> = new EventEmitter<TruckLocation>();
}
