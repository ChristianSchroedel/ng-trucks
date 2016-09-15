/**
 * Created by Christian Schrödel on 15.09.2016.
 */
import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {TruckLocation} from '../../../types/truck-locations';

@Component({
  moduleId: module.id,
  selector: 'location',
  templateUrl: 'location.component.html',
  styleUrls: ['location.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent {
  @Input() truckLocation: TruckLocation;
  @Output() locationClicked: EventEmitter<TruckLocation> = new EventEmitter<TruckLocation>();
}
