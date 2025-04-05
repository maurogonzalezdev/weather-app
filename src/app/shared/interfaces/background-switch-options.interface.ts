import { DeviceType, Theme } from '../types';
import { ImageCache } from './image-cache.interface';

export interface BackgroundSwitchOptions {
  deviceType: DeviceType;
  currentTheme: Theme;
  imageCache: ImageCache;
}
