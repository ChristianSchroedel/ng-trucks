/**
 * Created by Christian Schrödel on 13.09.2016.
 */
import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() title: string;
  @Input() showBack: boolean;
  @Output() backPressed: EventEmitter<any> = new EventEmitter<any>();
}
