/**
 * Created by Christian Schrödel on 06.09.2016.
 */
import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'logo',
  templateUrl: 'logo.component.html',
  styleUrls: ['logo.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  @Input() urlLogo: string;
  @Input() urlLink: string;
  @Input() title: string;
}
