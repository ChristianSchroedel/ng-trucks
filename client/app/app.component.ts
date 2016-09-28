/**
 * Created by developer on 24.08.2016.
 */
import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {LocationService} from './food-trucks/services';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private locationService: LocationService) {
  }

  ngOnInit() {
    this.locationService.loadLocations();
  }
}
