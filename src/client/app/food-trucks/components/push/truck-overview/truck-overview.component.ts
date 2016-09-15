/**
 * Created by Christian Schrödel on 13.09.2016.
 */
import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {Operator} from '../../../services/foodtruck.service';

@Component({
  moduleId: module.id,
  selector: 'truck-overview',
  templateUrl: 'truck-overview.component.html',
  styleUrls: ['truck-overview.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TruckOverviewComponent {
  @Input() operators: Operator[];
  @Output() operatorClicked: EventEmitter<string> = new EventEmitter<any>();
}
