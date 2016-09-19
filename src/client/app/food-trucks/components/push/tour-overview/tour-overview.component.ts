/**
 * Created by Christian Schrödel on 07.09.2016.
 */
import {Component, Input, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {TruckEvent} from '../../../types/truck-events';
import {TruckLocation} from '../../../types/truck-locations';
import {AsyncPipe} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'tour-overview',
  templateUrl: 'tour-overview.component.html',
  styleUrls: ['tour-overview.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  pipes: [AsyncPipe]
})
export class TourOverviewComponent {
  @Input() truckEvents: TruckEvent[];
  @Output() locationClicked: EventEmitter<TruckLocation> = new EventEmitter<TruckLocation>();
}
