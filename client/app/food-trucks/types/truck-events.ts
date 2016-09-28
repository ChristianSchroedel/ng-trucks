/**
 * Created by Christian Schrödel on 05.09.2016.
 */
import {TruckLocation} from './truck-locations';
import {Operator} from './truck-operators';
import {Location} from './truck-locations';

export interface TruckTour {
  event: TruckEvent;
  operator: Operator;
}

export interface TruckEvents {
  location: TruckLocation;
  events: TruckEvent[];
}

export interface Tour {
  operatorid: string;
  start: string;
  end: string;
  timezone: string;
  soldout: boolean;
  location: Location
}

export class TruckEvent {
  startDate: Date;
  endDate: Date;

  cityName: string;
  zipCode: string;
  streetName: string;
  streetNumber: string;

  operatorId: string;

  constructor(tour: Tour) {
    this.extractDateTime(tour);
    this.extractLocation(tour);

    this.operatorId = tour.operatorid;
  }

  private extractDateTime(tour: Tour) {
    this.startDate = new Date(tour.start);
    this.endDate = new Date(tour.end);
  }

  private extractLocation(tour: Tour) {
    let location: Location = tour.location;

    if (!location) {
      return;
    }

    this.cityName = location.city;
    this.zipCode = location.zipcode;
    this.streetName = location.street;
    this.streetNumber = location.number;
  }
}
