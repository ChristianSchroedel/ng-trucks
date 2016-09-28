/**
 * Created by Christian Schrödel on 13.09.2016.
 */
import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {TruckLocation} from '../../../types';

@Component({
  selector: 'location-overview',
  templateUrl: 'location-overview.component.html',
  styleUrls: ['./location-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationOverviewComponent {
  @Input() locations: TruckLocation[];
  @Output() locationClicked: EventEmitter<TruckLocation> = new EventEmitter<TruckLocation>();
}
