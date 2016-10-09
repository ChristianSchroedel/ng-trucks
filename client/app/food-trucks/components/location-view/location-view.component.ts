/**
 * Created by Christian Schrödel on 10.09.2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';
import {FoodTruckService, LocationService} from '../../services';
import {AppState} from '../../../app.state';
import {EventsState} from '../../reducers';
import {TruckEvents, TruckEvent, TruckTour, TruckLocation, Operator} from '../../types';

@Component({
  selector: 'location-view',
  templateUrl: 'location-view.component.html'
})
export class LocationViewComponent implements OnInit, OnDestroy {
  private locationName: string;
  private tours: TruckTour[];

  private clickedOperator$: BehaviorSubject<Operator>;

  private subs: Subscription[];

  constructor(private foodTruckService: FoodTruckService,
              private locationService: LocationService,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
    this.tours = [];
    this.clickedOperator$ = new BehaviorSubject<Operator>(undefined);
  }

  ngOnInit() {
    let paramsSub: Subscription = this.subscribeToParams();
    let combinedSub: Subscription = this.subscribeToAppState();

    this.subs = [paramsSub, combinedSub];
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  goToLocation(location: TruckLocation) {
    this.clickedOperator$.next(undefined);
    this.router.navigate(['/location', location.name]);
  }

  private subscribeToParams(): Subscription {
    return this.route.params.subscribe((params: any) => {
      let locationName: string = params.locationName;

      this.locationService.loadLocation(locationName);
      this.locationName = locationName;
    });
  }

  private subscribeToAppState(): Subscription {
    let stateObs: Observable<any> = Observable.combineLatest(
      this.store.select(appState => appState.events),
      this.store.select(appState => appState.operators),
      this.store.select(appState => appState.locations)
        .map((locations: TruckLocation[]) => locations.find((location: TruckLocation) => {
          return location.name === this.locationName
        })),
      (eventsState: EventsState, operators: Operator[], location: TruckLocation) => {
        return {eventsState, operators, location};
      });

    return stateObs
      .filter((combined: any) => combined.location)
      .subscribe((combined: any) => {
        let eventsState: EventsState = combined.eventsState;
        let operators: Operator[] = combined.operators;
        let location: TruckLocation = combined.location;

        if (!eventsState.loadedLocations.includes(location.name)) {
          this.foodTruckService.loadTruckListForLocation(location);
          return;
        }

        this.extractToursForLocation(eventsState.events, operators, location.name);
      });
  }

  private extractToursForLocation(loadedTruckEvents:TruckEvents[],
                                  operators: Operator[],
                                  locationName: string) {
    let tours: TruckTour[] = [];
    let truckEvents: TruckEvents = loadedTruckEvents.find((events: TruckEvents) => {
      return events.location.name === locationName;
    });

    if (truckEvents && truckEvents.events) {
      truckEvents.events.forEach((event: TruckEvent) => {
        tours.push({
          event: event,
          operator: operators.find((operator: Operator) => operator.id === event.operatorId)
        });
      });
    }

    this.tours = tours;
  }
}
