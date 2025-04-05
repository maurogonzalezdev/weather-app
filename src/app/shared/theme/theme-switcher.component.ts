import { Component } from '@angular/core';

import { ThemeSwitcherService } from './theme-switcher.service';

@Component({
  selector: 'theme-switcher-component',
  templateUrl: './theme-switcher.component.html',
  styles: ``,
})
export class ThemeSwitcherComponent {
  constructor(private readonly _themeSwitcherService: ThemeSwitcherService) {}
}
