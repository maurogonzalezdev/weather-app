import { Injectable } from '@angular/core';
import { DeviceType, Theme } from '../types';
import { BackgroundSwitchOptions, ImageCache } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BackgroundSwitchService {
  private _coreStyle: Record<any, string> = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  public backgroundSwitch(
    backgroundSwitchOptions: BackgroundSwitchOptions
  ): Record<any, string> {
    console.log(backgroundSwitchOptions);

    const { deviceType, currentTheme, imageCache } = backgroundSwitchOptions;

    switch (true) {
      case deviceType === 'mobile' && currentTheme === 'light':
        return {
          ...this._coreStyle,
          backgroundImage: `url(${
            imageCache['mobile-image-light' as keyof ImageCache]!.src
          })`,
        };
      case deviceType === 'mobile' && currentTheme === 'dark':
        return {
          ...this._coreStyle,
          backgroundImage: `url(${
            imageCache['mobile-image-dark' as keyof ImageCache]!.src
          })`,
        };
      case deviceType === 'tablet' && currentTheme === 'light':
        return {
          ...this._coreStyle,
          backgroundImage: `url(${
            imageCache['tablet-image-light' as keyof ImageCache]!.src
          })`,
        };
      case deviceType === 'tablet' && currentTheme === 'dark':
        return {
          ...this._coreStyle,
          backgroundImage: `url(${
            imageCache['tablet-image-dark' as keyof ImageCache]!.src
          })`,
        };
      case deviceType === 'desktop' && currentTheme === 'light':
        return {
          ...this._coreStyle,
          backgroundImage: `url(${
            imageCache['desktop-image-light' as keyof ImageCache]!.src
          })`,
        };
      case deviceType === 'desktop' && currentTheme === 'dark':
        return {
          ...this._coreStyle,
          backgroundImage: `url(${
            imageCache['desktop-image-dark' as keyof ImageCache]!.src
          })`,
        };
      default:
        return {};
    }
  }
}
