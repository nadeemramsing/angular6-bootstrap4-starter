import { Component, ChangeDetectionStrategy } from '@angular/core';

//lodash
import {
  each,
  pickBy,
  find
} from 'lodash';

//Technique to avoid loading whole lodash library into components => smaller module bundle size
const _ = {
  each,
  pickBy,
  find
};

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'app';
}
