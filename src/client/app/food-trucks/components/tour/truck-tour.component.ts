/**
 * Created by Christian Schrödel on 05.09.2016.
 */
import {Component, Input, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {TruckEvent} from '../../types/truck-events';

@Component({
  moduleId: module.id,
  selector: 'truck-tour',
  templateUrl: 'truck-tour.component.html',
  styleUrls: ['truck-tour.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TruckTourComponent {
  @Input() event: TruckEvent;
}
