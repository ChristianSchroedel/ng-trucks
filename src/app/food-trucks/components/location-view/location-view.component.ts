/**
 * Created by Christian Schrödel on 10.09.2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import {TruckEvents} from '../../types/truck-events';
import {FoodTruckService} from '../../services/foodtruck.service';
import {AppState} from '../../../app.state';
import {LoadedEventsState} from '../../reducers/loaded-events.reducer';
import {SCREEN} from '../../../reducers/screen.reducer';
import {ScreenActions} from '../../../actions/screen';
import {TruckLocation} from '../../types/truck-locations';

@Component({
  selector: 'location-view',
  templateUrl: 'location-view.component.html'
})
export class LocationViewComponent implements OnInit, OnDestroy {
  private truckEvents: TruckEvents;

  private sub: Subscription;

  constructor(private foodTruckService: FoodTruckService,
              private store: Store<AppState>,
              private screenActions: ScreenActions,
              private router: Router,
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

      this.store.dispatch(this.screenActions.setCurrentScreen({
        screen: SCREEN.LOCATION_VIEW,
        title: locationName
      }));

      if (!loadedEvents.loadedLocations.includes(locationName)) {
        this.foodTruckService.loadTruckListForLocation({
          name: locationName,
          geoLocation: {
            latitude: latitude,
            longitude: longitude
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

  goToLocation(location: TruckLocation) {
    let geoLocation = location.geoLocation;

    let navExtras: NavigationExtras = {
      queryParams: {longitude: geoLocation.longitude, latitude: geoLocation.latitude}
    };

    this.router.navigate(['/location', location.name], navExtras);
  }
}
