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
import {FoodTruckService} from '../../services/foodtruck.service';
import {AppState} from '../../../app.state';
import {EventsState} from '../../reducers';
import {TruckLocation, locations, Operator} from '../../types';

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
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {
    this.locations = [];
    this.operators = [];
    this.clickedOperator$ = new BehaviorSubject<Operator>(undefined);
  }

  ngOnInit() {
    let eventsObservable: Observable<any> = Observable.combineLatest(
      this.route.params,
      this.store.select(appState => appState.events),
      (params: any, eventsState: EventsState) => {
        return {params, eventsState};
      }
    );

    let operatorsObservable: Observable<any> = Observable.combineLatest(
      this.route.params,
      this.store.select(appState => appState.operators),
      (params: any, operators: Operator[]) => {
        return {params, operators};
      }
    );

    let eventsSub: Subscription = eventsObservable
      .distinctUntilChanged()
      .subscribe((combined: any) => {
        let params: any = combined.params;
        let eventsState: EventsState = combined.eventsState;

        let regionName = params.regionName;

        this.locations = locations.filter((location: TruckLocation) => {
          return location.region === regionName.toLowerCase()
        });
        this.regionName = regionName;

        // Preload locations for this region
        this.loadNextLocation(eventsState.loadedLocations);
      });

    let operatorsSub: Subscription = operatorsObservable
      .distinctUntilChanged()
      .subscribe((combined: any) => {
        let params: any = combined.params;
        let operators: Operator[] = combined.operators;

        let regionName: string = params.regionName.toLowerCase();

        this.operators = operators.filter((operator: Operator) => {
          if (!operator.locations) {
            return false;
          }

          return undefined !== operator.locations.find((location: TruckLocation) => {
              return location.region === regionName;
            })
        });
      });

    this.subs = [eventsSub, operatorsSub];
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  goToLocation(location: TruckLocation) {
    this.router.navigate(['/location', location.name]);
  }

  private loadNextLocation = (loadedLocations: string[]) => {
    let location: TruckLocation = locations.find((location: TruckLocation) => {
      return !loadedLocations.includes(location.name)
    });

    if (location) {
      this.foodTruckService.loadTruckListForLocation(location);
    }
  };
}
