/**
 * Created by Christian Schrödel on 03.09.2016.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/take';
import {TruckEvent} from '../types/truck-events';
import {TruckQuery} from '../types/truck-queries';
import {TruckLocation} from '../types/truck-locations';
import {AppState} from '../../app.state';
import {LoadedEventsActions} from '../actions/loaded-events';
import {LoadedOperatorsActions} from '../actions/loaded-operators';

const FOODTRUCK_API_URL: string = '/api/food-trucks';

interface TruckList {
  locationName: string;
  tours: Tour[];
  operators: Operator[];
}

export interface Operator {
  id: string;
  name: string;
  nameShort: string;
  description: string;
  url: string;
  offer: string;
  region: string;
  logo: string;
  impressions: string[];
  colors: Colors;
  premium: boolean;
  name_url: string;
  locations?: TruckLocation[];
}

export interface Tour {
  operatorid: string;
  start: string;
  end: string;
  timezone: string;
  soldout: boolean;
  location: Location
}

export interface Location {
  name: string;
  street: string;
  number: string;
  zipcode: string;
  city: string;
  sponsor: string;
  map: Map;
}

export interface Map {
  longitude: string;
  latitude: string;
  icon: string;
  colors: Colors;
}

export interface Colors {
  truck: string;
  text: string;
}

@Injectable()
export class FoodTruckService {
  private requestOptions: RequestOptions;

  constructor(private http: Http,
              private store: Store<AppState>,
              private eventsActions: LoadedEventsActions,
              private operatorActions: LoadedOperatorsActions) {
    let headers: Headers = new Headers({'Content-Type': 'application/json'});

    this.requestOptions = new RequestOptions({headers: headers});
  }

  loadTruckListForLocation(location: TruckLocation) {
    console.log(`load location '${location.name}'`);
    this.requestFoodTrucks(location.geoLocation, location.name);
  }

  private requestFoodTrucks(requestBody: TruckQuery, locationName?: string) {
    this.store.dispatch(this.eventsActions.loadLocation(locationName));

    this.http.post(FOODTRUCK_API_URL, JSON.stringify(requestBody), this.requestOptions)
      .map((res: Response) => res.json())
      .map((trucklist: TruckList) => {
        let tours: Tour[] = Object.keys(trucklist.tours).map((key) => trucklist.tours[key]);
        let operators: Operator[] = Object.keys(trucklist.operators).map((key) => trucklist.operators[key]);

        let truckEvents: TruckEvent[] = tours.map((tour: Tour) => {
          let operator = operators.find((operator: Operator) => operator.id === tour.operatorid);

          return new TruckEvent(tour, operator);
        });

        this.store.dispatch(
          this.eventsActions.loadLocationDone({
            locationName: locationName || `${requestBody.longitude}, ${requestBody.longitude}`,
            latitude: requestBody.latitude,
            longitude: requestBody.longitude,
            events: truckEvents
          })
        );

        this.store.dispatch(this.operatorActions.loadOperatorsDone(operators));
      }).take(1).subscribe();
  }
}
