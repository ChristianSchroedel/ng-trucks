/**
 * Created by Christian Schrödel on 28.09.2016.
 */
import {Injectable} from '@angular/core';
import {RequestOptions, Http, Headers, Response} from '@angular/http';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {TruckLocation} from '../types';
import {LocationsActions} from '../actions';

const LOCATION_API_URL = '/api/locations';

@Injectable()
export class LocationService {
  private requestOptions: RequestOptions;

  constructor(private http: Http,
              private store: Store<AppState>,
              private locationsAction: LocationsActions) {
    let headers: Headers = new Headers({'Content-Type': 'application/json'});

    this.requestOptions = new RequestOptions({headers: headers});
  }

  loadLocations() {
    this.http.get(LOCATION_API_URL)
      .take(1)
      .map((res: Response) => res.json().data)
      .subscribe((locations: TruckLocation[]) => {
        this.store.dispatch(this.locationsAction.loadLocationsDone(locations));
      });
  }

  loadLocationsForRegion(region: string) {
    this.http.get(`${LOCATION_API_URL}?region=${region}`)
      .take(1)
      .map((res: Response) => res.json().data)
      .subscribe((locations: TruckLocation[]) => {
        this.store.dispatch(this.locationsAction.loadLocationsDone(locations));
      });
  }

  loadLocation(locationName: string) {
    this.http.get(`${LOCATION_API_URL}/${locationName}`)
      .take(1)
      .map((res: Response) => res.json().data)
      .subscribe((location: TruckLocation) => {
        this.store.dispatch(this.locationsAction.loadLocationsDone([location]));
      });
  }
}
