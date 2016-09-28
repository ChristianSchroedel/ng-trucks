/**
 * Created by Christian Schrödel on 07.09.2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/combineLatest';
import {AppState} from '../../../app.state';
import {FoodTruckService, LocationService} from '../../services';
import {EventsState} from '../../reducers';
import {TruckLocation, Operator} from '../../types';

@Component({
  selector: 'region-view',
  templateUrl: 'region-view.component.html'
})
export class RegionViewComponent implements OnInit, OnDestroy {
  private regionName: string;
  private locations: TruckLocation[];
  private operators: Operator[];

  private clickedOperator$: BehaviorSubject<Operator>;

  private subs: Subscription[];

  constructor(private foodTruckService: FoodTruckService,
              private locationsService: LocationService,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {
    this.locations = [];
    this.operators = [];
    this.clickedOperator$ = new BehaviorSubject<Operator>(undefined);
  }

  ngOnInit() {
    let paramsSub: Subscription = this.subscribeToParams();
    let operatorsSub: Subscription = this.subscribeToOperators();
    let locationsSub: Subscription = this.subscribeToLocations();

    this.subs = [paramsSub, locationsSub, operatorsSub];
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  goToLocation(location: TruckLocation) {
    this.router.navigate(['/location', location.name]);
  }

  private subscribeToParams(): Subscription {
    return this.route.params.subscribe((params: any) => {
      let regionName = params.regionName;

      this.regionName = regionName;
      this.locationsService.loadLocationsForRegion(regionName.toLowerCase());
    });
  }

  private subscribeToOperators(): Subscription {
    return this.store.select(appState => appState.operators)
      .map((operators: Operator[]) => operators
        .filter((operator: Operator) => operator.locations !== undefined)
        .filter((operator: Operator) => {
          return undefined !== operator.locations.find((location: TruckLocation) => {
              return location.region === this.regionName.toLowerCase();
            })
        }))
      .subscribe((operators: Operator[]) => {
        this.operators = operators;
      });
  }

  private subscribeToLocations(): Subscription {
    return Observable.combineLatest(
      this.store.select(appState => appState.locations)
        .map((locations: TruckLocation[]) => locations.filter((location: TruckLocation) => {
          return location.region === this.regionName.toLowerCase()
        })),
      this.store.select(appState => appState.events),
      (locations: TruckLocation[], eventsState: EventsState) => {
        return {locations, eventsState};
      })
      .subscribe((combined: any) => {
        let locations: TruckLocation[] = combined.locations;
        let eventsState: EventsState = combined.eventsState;

        this.locations = locations;

        // Preload events for this region
        this.loadNextLocation(eventsState.loadedLocations, locations);
      });
  }

  private loadNextLocation(loadedLocations: string[], locations: TruckLocation[]) {
    let location: TruckLocation = locations.find((location: TruckLocation) => {
      return !loadedLocations.includes(location.name)
    });

    if (location) {
      this.foodTruckService.loadTruckListForLocation(location);
    }
  };
}
