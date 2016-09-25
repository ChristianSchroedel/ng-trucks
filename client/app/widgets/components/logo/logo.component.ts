/**
 * Created by Christian Schrödel on 06.09.2016.
 */
import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: 'logo.component.html',
  styleUrls: ['./logo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  @Input() urlLogo: string;
  @Input() title: string;
  @Input() subTitle: string;
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
}
