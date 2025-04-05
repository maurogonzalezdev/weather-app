import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  private _mobileBreakpoint = `(max-width: ${
    import.meta.env.NG_APP_MOBILE_BREAKPOINT
  }px)`;
  private _tabletBreakpoint = `(min-width: ${
    import.meta.env.NG_APP_MOBILE_BREAKPOINT
  }px) and (max-width: ${import.meta.env.NG_APP_TABLET_BREAKPOINT}px)`;

  constructor(private readonly _breakpointObserver: BreakpointObserver) {}

  public getDeviceType$(): Observable<'mobile' | 'tablet' | 'desktop'> {
    return this._breakpointObserver
      .observe([this._mobileBreakpoint, this._tabletBreakpoint])
      .pipe(
        map((state: BreakpointState) => {
          if (state.breakpoints[this._mobileBreakpoint]) {
            return 'mobile';
          }
          if (state.breakpoints[this._tabletBreakpoint]) {
            return 'tablet';
          }
          return 'desktop';
        })
      );
  }
}
