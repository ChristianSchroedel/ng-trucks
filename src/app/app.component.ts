/**
 * Created by developer on 24.08.2016.
 */
import {Component, ViewEncapsulation, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {AppState} from './app.state';
import {ScreenState, SCREEN} from './reducers/screen.reducer';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private screenTitle: string;
  private showBack: boolean;

  private sub: Subscription;

  constructor(private store: Store<AppState>,
              private location: Location) {
  }

  ngOnInit() {
    this.sub = this.store.select(appState => appState.currentScreen)
      .subscribe((currentScreen: ScreenState) => {
        this.screenTitle = currentScreen.title;

        switch (currentScreen.screen) {
          case SCREEN.REGION_VIEW:
            this.showBack = false;
            break;
          case SCREEN.LOCATION_VIEW:
          case SCREEN.TRUCK_VIEW:
            this.showBack = true;
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
