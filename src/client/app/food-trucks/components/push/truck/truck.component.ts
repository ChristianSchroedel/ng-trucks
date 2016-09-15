/**
 * Created by Christian Schrödel on 13.09.2016.
 */

import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {Operator} from '../../../services/foodtruck.service';

@Component({
  moduleId: module.id,
  selector: 'truck',
  templateUrl: 'truck.component.html',
  styleUrls: ['truck.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TruckComponent {
  @Input() operator: Operator;
}
