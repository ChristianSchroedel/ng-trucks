/**
 * Created by Christian Schrödel on 07.09.2016.
 */
import {Component, Input, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {TruckTour, TruckLocation, Operator} from '../../../types';

@Component({
  selector: 'tour-overview',
  templateUrl: 'tour-overview.component.html',
  styleUrls: ['./tour-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourOverviewComponent {
  @Input() tours: TruckTour[];
  @Output() locationClicked: EventEmitter<TruckLocation> = new EventEmitter<TruckLocation>();
  @Output() operatorClicked: EventEmitter<Operator> = new EventEmitter<Operator>();
}
