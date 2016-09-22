/**
 * Created by Christian Schrödel on 13.09.2016.
 */

import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Output} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Operator} from '../../../services/foodtruck.service';
import {TruckLocation} from '../../../types/truck-locations';

@Component({
  selector: 'truck',
  templateUrl: 'truck.component.html',
  styleUrls: ['./truck.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TruckComponent {
  @Input() operator: Operator;
  @Output() locationClicked: EventEmitter<TruckLocation> = new EventEmitter<TruckLocation>();

  private showDetails$: BehaviorSubject<boolean>;

  constructor() {
    this.showDetails$ = new BehaviorSubject<boolean>(false);
  }
}
