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
import {Region, getRegion} from '../../types/truck-regions';
import {FoodTruckService, Operator} from '../../services/foodtruck.service';
import {AppState} from '../../../app.state';
import {LoadedEventsState} from '../../reducers/loaded-events.reducer';
import {TruckLocation} from '../../types/truck-locations';
import {TruckEvents, TruckEvent} from '../../types/truck-events';
import {ScreenActions} from '../../../actions/screen';
import {SCREEN} from '../../../reducers/screen.reducer';

@Component({
  moduleId: module.id,
  selector: 'region-view',
  templateUrl: 'region-view.component.html'
})
export class RegionViewComponent implements OnInit, OnDestroy {
  private regionName: string;
  private region: Region;
  private operators: Operator[];

  private sub: Subscription;

  constructor(private foodTruckService: FoodTruckService,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private screenActions: ScreenActions) {
    this.operators = [];
  }

  ngOnInit() {
    let combined: Observable<any> = Observable.combineLatest(
      this.route.params,
      this.store.select(appState => appState.loadedEvents),
      this.store.select(appState => appState.loadedOperators),
      (params: any, loadedEvents: LoadedEventsState, loadedOperators: Operator[]) => {
        return {params, loadedEvents, loadedOperators};
      });

    this.sub = combined.subscribe((combined: any) => {
      let params: any = combined.params;
      let loadedEvents: LoadedEventsState = combined.loadedEvents;
      let loadedOperators: Operator[] = combined.loadedOperators;

      this.region = getRegion(params.regionName);
      this.regionName = this.region.name;

      this.store.dispatch(this.screenActions.setCurrentScreen({
        screen: SCREEN.REGION_VIEW,
        title: this.regionName
      }));

      // Preload locations for this region
      this.loadNextLocation(loadedEvents.loadedLocations);

      // Extract available Operators for this region
      this.extractOperatorsForRegion(loadedOperators, loadedEvents.events);
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

  goToTruck(operator: Operator) {
    this.router.navigate(['/truck', operator.id]);
  }

  private loadNextLocation = (loadedLocations: string[]) => {
    let location: TruckLocation = this.region.truckLocations.find((location: TruckLocation) => {
      return !loadedLocations.includes(location.name)
    });

    if (location) {
      this.foodTruckService.loadTruckListForLocation(location);
    }
  };

  private extractOperatorsForRegion(operators: Operator[], loadedLocations: TruckEvents[]) {
    let locationNamesForRegion: string[] = this.region.truckLocations.map((location: TruckLocation) => location.name);

    let loadedEventsForRegion: TruckEvents[] = loadedLocations.filter((events: TruckEvents) => {
      return locationNamesForRegion.includes(events.locationName)
    });

    let operatorIdsForRegion: string[] = [];

    loadedEventsForRegion.forEach((location: TruckEvents) => {
      operatorIdsForRegion = operatorIdsForRegion.concat(location.events.map((event: TruckEvent) => event.operatorId))
    });

    this.operators = operators.filter((operator: Operator) => {
      return operatorIdsForRegion.includes(operator.id);
    });
  }
}
