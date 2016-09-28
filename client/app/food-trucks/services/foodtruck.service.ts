/**
 * Created by Christian Schrödel on 03.09.2016.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/take';
import {TruckEvent, TruckLocation, Operator, Tour} from '../types';
import {EventsActions, OperatorsActions} from '../actions';
import {AppState} from '../../app.state';

const FOODTRUCK_API_URL: string = '/api/foodtrucks';

interface TruckList {
  locationName: string;
  tours: Tour[];
  operators: Operator[];
}

interface TruckQuery {
  date?:string;
  longitude: number;
  latitude: number;
  radius?: number;
}

@Injectable()
export class FoodTruckService {
  private requestOptions: RequestOptions;

  constructor(private http: Http,
              private store: Store<AppState>,
              private eventsActions: EventsActions,
              private operatorActions: OperatorsActions) {
    let headers: Headers = new Headers({'Content-Type': 'application/json'});

    this.requestOptions = new RequestOptions({headers: headers});
  }

  loadTruckListForLocation(location: TruckLocation) {
    console.log(`load location '${location.name}'`);
    this.requestFoodTrucks(location);
  }

  private requestFoodTrucks(location: TruckLocation) {
    this.store.dispatch(this.eventsActions.loadEventsForLocation(location.name));

    let requestBody: TruckQuery = {
      date: 'week',
      longitude: location.geoLocation.longitude,
      latitude: location.geoLocation.latitude,
      radius: 60
    };

    this.http.post(FOODTRUCK_API_URL, JSON.stringify(requestBody), this.requestOptions)
      .map((res: Response) => res.json())
      .map((truckList: TruckList) => {
        let tours: Tour[] = Object.keys(truckList.tours).map((key) => truckList.tours[key]);
        let operators: Operator[] = Object.keys(truckList.operators).map((key) => truckList.operators[key]);

        this.store.dispatch(
          this.eventsActions.loadEventsForLocationDone({
            location: location,
            events: tours.map((tour: Tour) => new TruckEvent(tour))
          })
        );

        this.store.dispatch(this.operatorActions.loadOperatorsDone(operators));

        operators.forEach((operator: Operator) => {
          this.store.dispatch(this.operatorActions.addLocation(operator.id, location))
        });
      }).take(1).subscribe();
  }
}
