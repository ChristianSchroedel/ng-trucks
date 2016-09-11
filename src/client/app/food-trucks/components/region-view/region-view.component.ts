/**
 * Created by Christian Schrödel on 07.09.2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/combineLatest';
import {TruckEvents} from '../../types/truck-events';
import {REGION_NUREMBERG, Region, getRegion} from '../../types/truck-regions';
import {FoodTruckService} from '../../services/foodtruck.service';
import {AppState} from '../../../app.state';
import {LoadedEventsState} from '../../reducers/loaded-events.reducer';
import {TruckLocation} from '../../types/truck-locations';

@Component({
  moduleId: module.id,
  selector: 'region-view',
  templateUrl: 'region-view.component.html'
})
export class RegionViewComponent implements OnInit, OnDestroy {
  private regionName: string;
  private region: Region;
  private truckEventsList: TruckEvents[];

  private sub: Subscription;

  constructor(private foodTruckService: FoodTruckService,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {
    this.region = REGION_NUREMBERG;
    this.truckEventsList = [];
  }

  ngOnInit() {
    let combined: Observable<any> = Observable.combineLatest(
      this.route.params,
      this.store.select(appState => appState.loadedEvents),
      (params: any, loadedEvents: LoadedEventsState) => {
        return {params, loadedEvents};
      }
    );

    this.sub = combined.subscribe((combined: any) => {
      let params: any = combined.params;
      let loadedEvents: LoadedEventsState = combined.loadedEvents;

      this.region = getRegion(params.regionName);
      this.regionName = this.region.name;

      this.loadNextLocation(loadedEvents.loadedLocations);

      this.truckEventsList = loadedEvents.events.map((truckEvents: TruckEvents) => {
        return {
          locationName: truckEvents.locationName,
          longitude: truckEvents.longitude,
          latitude: truckEvents.latitude,
          events: truckEvents.events.slice(0, 1)
        }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToLocation(events: TruckEvents) {
    let navExtras: NavigationExtras = {
      queryParams: {longitude: events.longitude, latitude: events.latitude}
    };

    this.router.navigate(['/location', events.locationName], navExtras);
  }

  private loadNextLocation = (loadedLocations: string[]) => {
    let location: TruckLocation = this.region.truckLocations.find((location: TruckLocation) => {
      return !loadedLocations.includes(location.name)
    });

    if (location) {
      this.foodTruckService.loadTruckListForLocation(location);
    }
  };
}
