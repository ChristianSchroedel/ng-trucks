/**
 * Created by Christian Schrödel on 23.09.2016.
 */
import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  templateUrl: 'impressum.component.html'
})
export class ImpressumComponent {
  constructor(private location: Location) {
  }
}
