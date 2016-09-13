/**
 * Created by Christian Schrödel on 07.09.2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {AppState} from '../../../app.state';
import {Operator} from '../../services/foodtruck.service';

@Component({
  moduleId: module.id,
  selector: 'truck-view',
  templateUrl: 'truck-view.component.html'
})
export class TruckViewComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  private truck: Operator;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    let combined: Observable<any> = Observable.combineLatest(
      this.route.params,
      this.store.select(appState => appState.loadedOperators),
      (params: any, operators: Operator[]) => {
        return {params, operators};
      });

    this.sub = combined.subscribe((combined: any) => {
      let params: any = combined.params;
      let operators: Operator[] = combined.operators;

      let operatorId: string = params.operatorId;

      this.truck = operators.find((op: Operator) => op.id === operatorId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
