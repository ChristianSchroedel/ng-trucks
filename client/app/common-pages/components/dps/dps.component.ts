/**
 * Created by Christian Schrödel on 23.09.2016.
 */
import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  templateUrl: 'dps.component.html'
})
export class DataPrivacyStatementComponent {
  constructor(private location: Location) {
  }
}
