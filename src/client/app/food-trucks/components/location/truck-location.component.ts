/**
 * Created by Christian Schrödel on 07.09.2016.
 */
import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {TruckEvent} from '../../types/truck-events';

@Component({
  moduleId: module.id,
  selector: 'truck-location',
  templateUrl: 'truck-location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TruckLocationComponent {
  @Input() truckEvents: TruckEvent[];
}
