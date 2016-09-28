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
import {FoodTruckService} from '../../services/foodtruck.service';
import {AppState} from '../../../app.state';
import {EventsState} from '../../reducers';
import {TruckEvents, TruckEvent, TruckTour, TruckLocation, locations, Operator} from '../../types';

@Component({
  selector: 'location-view',
  templateUrl: 'location-view.component.html'
})
export class LocationViewComponent implements OnInit, OnDestroy {
  private locationName: string;
  private tours: TruckTour[];

  private clickedOperator$: BehaviorSubject<Operator>;

  private sub: Subscription;

  constructor(private foodTruckService: FoodTruckService,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
    this.tours = [];
    this.clickedOperator$ = new BehaviorSubject<Operator>(undefined);
  }

  ngOnInit() {
    let combined: Observable<any> = Observable.combineLatest(
      this.route.params,
      this.store.select(appState => appState.events),
      this.store.select(appState => appState.operators),
      (params: any, eventsState: EventsState, operators: Operator[]) => {
        return {params, eventsState, operators};
      });

    this.sub = combined
      .distinctUntilChanged()
      .subscribe((combined: any) => {
        let params: any = combined.params;
        let eventsState: EventsState = combined.eventsState;
        let operators: Operator[] = combined.operators;

        let locationName = params.locationName;
        let location: TruckLocation = locations.find((location: TruckLocation) => {
          return location.name === locationName
        });

        if (!eventsState.loadedLocations.includes(locationName)) {
          this.foodTruckService.loadTruckListForLocation(location);
          return;
        }

        this.extractToursForLocation(eventsState.events, operators, locationName);
        this.locationName = locationName;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToLocation(location: TruckLocation) {
    this.clickedOperator$.next(undefined);
    this.router.navigate(['/location', location.name]);
  }

  private extractToursForLocation(loadedTruckEvents: TruckEvents[],
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
