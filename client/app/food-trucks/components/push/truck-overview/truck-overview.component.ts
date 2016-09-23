/**
 * Created by Christian Schrödel on 13.09.2016.
 */
import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Operator} from '../../../services/foodtruck.service';
import {TruckLocation} from '../../../types/truck-locations';

@Component({
  selector: 'truck-overview',
  templateUrl: 'truck-overview.component.html',
  styleUrls: ['./truck-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TruckOverviewComponent {
  @Input() operators: Operator[];
  @Output() operatorClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() operatorLocationClicked: EventEmitter<TruckLocation> = new EventEmitter<TruckLocation>();
}
