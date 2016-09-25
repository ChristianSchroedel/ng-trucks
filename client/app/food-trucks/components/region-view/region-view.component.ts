/**
 * Created by Christian Schrödel on 07.09.2016.
 */
import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/combineLatest';
import {Region, getRegion} from '../../types/truck-regions';
import {FoodTruckService, Operator} from '../../services/foodtruck.service';
import {AppState} from '../../../app.state';
import {LoadedEventsState} from '../../reducers/loaded-events.reducer';
import {TruckLocation} from '../../types/truck-locations';
import {TruckEvents, TruckEvent} from '../../types/truck-events';

@Component({
  selector: 'region-view',
  templateUrl: 'region-view.component.html'
})
export class RegionViewComponent implements OnInit, OnDestroy {
  private regionName: string;
  private region: Region;
  private operators: Operator[];

  private clickedOperator$: BehaviorSubject<Operator>;

  private sub: Subscription;

  constructor(private foodTruckService: FoodTruckService,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {
    this.operators = [];
    this.clickedOperator$ = new BehaviorSubject<Operator>(undefined);
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
      operatorIdsForRegion = operatorIdsForRegion.concat(location.events.map((event: TruckEvent) => event.operator.id))
    });

    this.operators = operators.filter((operator: Operator) => {
      return operatorIdsForRegion.includes(operator.id);
    });

    this.operators.forEach((operator: Operator) => {
      operator.locations = loadedEventsForRegion
        .filter((events: TruckEvents) => {
          return undefined !== events.events.find((truckEvent: TruckEvent) => truckEvent.operator.id === operator.id)
        })
        .map((events: TruckEvents) => {
          return {
            name: events.locationName,
            geoLocation: {
              longitude: events.longitude,
              latitude: events.latitude
            }
          }
        });
    });
  }
}
