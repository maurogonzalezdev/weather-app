import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserverService } from './shared/helpers/breakpoint-observer.service';
import { ThemeSwitcherService } from './shared/theme/theme-switcher.service';
import {
  combineLatestWith,
  distinctUntilChanged,
  Subject,
  takeUntil,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImageCacheService } from './shared/helpers/image-cache.service';
import { BackgroundSwitchService } from './shared/theme/background-switch.service';
import { ImageCache } from './shared/interfaces';
import { Theme } from './shared/types';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'weather-app';
  private _deviceType: 'mobile' | 'tablet' | 'desktop' = 'mobile';

  private _backgroundStyle: Record<any, string> = {};
  private _destroy$: Subject<void> = new Subject<void>();
  private _currentTheme: Theme = 'light';
  private _cachedImages: ImageCache = {
    mobileDarkImage: null,
    mobileLightImage: null,
    tabletDarkImage: null,
    tabletLightImage: null,
    desktopDarkImage: null,
    desktopLightImage: null,
  };

  constructor(
    private readonly _breakpointObserverService: BreakpointObserverService,
    private readonly _themeSwitcherService: ThemeSwitcherService,
    private readonly _imageCacheService: ImageCacheService,
    private readonly _backgroundSwitch: BackgroundSwitchService
  ) {
    this._cachedImages = this._imageCacheService.getImageCache();
  }

  ngOnInit(): void {
    this._breakpointObserverService
      .getDeviceType$()
      .pipe(
        combineLatestWith(this._themeSwitcherService.getCurrentTheme$()),
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe(([deviceType, currentTheme]) => {
        this._deviceType = deviceType;
        this._currentTheme = currentTheme as Theme;
        this._backgroundStyle = this._backgroundSwitch.backgroundSwitch({
          deviceType: this._deviceType,
          currentTheme: this._currentTheme,
          imageCache: this._cachedImages,
        });

        console.log(this._backgroundStyle);
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public toggleTheme(): void {
    this._themeSwitcherService.toggleTheme();
  }

  get deviceType(): 'mobile' | 'tablet' | 'desktop' {
    return this._deviceType;
  }

  get backgroundStyle(): Record<any, string> {
    return this._backgroundStyle;
  }
}
