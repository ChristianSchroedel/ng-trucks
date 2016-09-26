/**
 * Created by Christian Schrödel on 05.09.2016.
 */
import {Tour, Operator, Location} from '../services/foodtruck.service';

export interface TruckEvents {
  locationName: string;
  longitude: number;
  latitude: number;
  events: TruckEvent[];
}

export class TruckEvent {
  startDate: Date;
  endDate: Date;

  cityName: string;
  zipCode: string;
  streetName: string;
  streetNumber: string;

  constructor(tour: Tour, public operator: Operator) {
    this.extractDateTime(tour);
    this.extractLocation(tour);
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
