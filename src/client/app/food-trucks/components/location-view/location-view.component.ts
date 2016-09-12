/**
 * Created by Christian Schrödel on 10.09.2016.
 */
import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import {TruckEvents} from '../../types/truck-events';
import {FoodTruckService} from '../../services/foodtruck.service';
import {AppState} from '../../../app.state';
import {LoadedEventsState} from '../../reducers/loaded-events.reducer';

@Component({
  moduleId: module.id,
  selector: 'location-view',
  templateUrl: 'location-view.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LocationViewComponent implements OnInit, OnDestroy {
  private truckEvents: TruckEvents;

  private sub: Subscription;

  constructor(private foodTruckService: FoodTruckService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    let combined: Observable<any> = Observable.combineLatest(
      this.route.params,
      this.route.queryParams,
      this.store.select(appState => appState.loadedEvents),
      (params: any, queryParams: any, loadedEvents: LoadedEventsState) => {
        return {params, queryParams, loadedEvents};
      });

    this.sub = combined.subscribe((combined: any) => {
      let params: any = combined.params;
      let queryParams: any = combined.queryParams;
      let loadedEvents: LoadedEventsState = combined.loadedEvents;

      let locationName: string = params.locationName;
      let longitude: number = queryParams.longitude;
      let latitude: number = queryParams.latitude;

      console.log(`show location: ${locationName}`);

      if (!loadedEvents.loadedLocations.includes(locationName)) {
        this.foodTruckService.loadTruckListForLocation({
          name: locationName,
          geoLocation: {
            longitude: longitude,
            latitude: latitude
          }
        });
        return;
      }

      this.truckEvents = loadedEvents.events.find((events: TruckEvents) => {
        return events.locationName === locationName;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
