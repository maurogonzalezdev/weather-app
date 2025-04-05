import { Injectable } from '@angular/core';
import { ImageCache } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ImageCacheService {
  private _imageCache: ImageCache = {
    mobileDarkImage: null,
    mobileLightImage: null,
    tabletDarkImage: null,
    tabletLightImage: null,
    desktopDarkImage: null,
    desktopLightImage: null,
  };

  private _mobileDarkImage: string = 'mobile-image-dark.jpg';
  private _mobileLightImage: string = 'mobile-image-light.jpg';
  private _tabletDarkImage: string = 'tablet-image-dark.jpg';
  private _tabletLightImage: string = 'tablet-image-light.jpg';
  private _desktopDarkImage: string = 'desktop-image-dark.jpg';
  private _desktopLightImage: string = 'desktop-image-light.jpg';

  constructor() {
    const images = new Array<string>(
      this._mobileLightImage,
      this._mobileDarkImage,
      this._tabletLightImage,
      this._tabletDarkImage,
      this._desktopLightImage,
      this._desktopDarkImage
    );

    this._preloadImages(images);
  }

  private _preloadImages(images: string[]): void {
    try {
      if (!images || images.length === 0) {
        throw new Error('No images to preload');
      }

      images.forEach((src: string) => {
        const imgName = src.split('.')[0];
        if (!imgName) {
          throw new Error('Image name is empty');
        }

        const img = new Image();
        img.src = src;
        this._imageCache[imgName as keyof ImageCache] = img;
      });

      return;
    } catch (error: unknown) {
      throw new Error(
        `Error preloading images: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  public getImageCache(): ImageCache {
    return this._imageCache;
  }
}
