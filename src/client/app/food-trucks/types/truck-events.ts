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
  vendorName: string;
  vendorLogo: string;
  vendorUrl: string;
  vendorOffer: string;

  date: string;
  weekDay: string;
  startTime: string;
  endTime: string;

  cityName: string;
  zipCode: string;
  streetName: string;
  streetNumber: string;

  constructor(tour: Tour, private operator: Operator) {
    this.extractVendorInformation(operator);

    this.extractDateTime(tour);
    this.extractLocation(tour);
  }

  private extractVendorInformation(operator: Operator) {
    this.vendorName = operator.nameShort || operator.name;
    this.vendorLogo = operator.logo;
    this.vendorUrl = operator.name_url || operator.url || '';
    this.vendorOffer = operator.offer;
  }

  private extractDateTime(tour: Tour) {
    let startDate: Date = new Date(tour.start);
    let endDate: Date = new Date(tour.end);

    let startWeekDay: string = TruckEvent.getWeekDayString(startDate.getDay());
    let startDay: string = TruckEvent.numPad(startDate.getDate());
    let startMonth: string = TruckEvent.numPad(startDate.getMonth()+1);

    this.weekDay = startWeekDay;
    this.date = `${startWeekDay} ${startDay}.${startMonth}.${startDate.getFullYear()}`;

    let startHours: string = TruckEvent.numPad(startDate.getHours());
    let startMinutes: string = TruckEvent.numPad(startDate.getMinutes());

    let endHours: string = TruckEvent.numPad(endDate.getHours());
    let endMinutes: string = TruckEvent.numPad(endDate.getMinutes());

    this.startTime = `${startHours}:${startMinutes}`;
    this.endTime = `${endHours}:${endMinutes}`;
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

  private static numPad(num: number): string {
    return (num < 10) ? `0${num}` : `${num}`;
  }

  private static getWeekDayString(numDay: number): string {
    switch (numDay) {
      case 0: return 'Sonntag';
      case 1: return 'Montag';
      case 2: return 'Dienstag';
      case 3: return 'Mittwoch';
      case 4: return 'Donnerstag';
      case 5: return 'Freitag';
      case 6: return 'Samstag';
      default: return '';
    }
  }
}
