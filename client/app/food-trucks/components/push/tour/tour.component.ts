/**
 * Created by Christian Schrödel on 05.09.2016.
 */
import {Component, Input, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {TruckTour, TruckLocation, Operator} from '../../../types';

@Component({
  selector: 'tour',
  templateUrl: 'tour.component.html',
  styleUrls: ['./tour.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourComponent {
  @Input() tour: TruckTour;
  @Output() locationClicked: EventEmitter<TruckLocation> = new EventEmitter<TruckLocation>();
  @Output() operatorClicked: EventEmitter<Operator> = new EventEmitter<Operator>();
}
