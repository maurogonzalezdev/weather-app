import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  private _currentThemeSubject: BehaviorSubject<string>;

  constructor() {
    let savedTheme = localStorage.getItem('theme');
    savedTheme = savedTheme === 'light' || 'dark' ? savedTheme : 'light';
    this._currentThemeSubject = new BehaviorSubject<string>(savedTheme!);
    this._setDomAttribute('data-theme', savedTheme!);
  }

  public toggleTheme(): void {
    const newTheme =
      this._currentThemeSubject.value === 'light' ? 'dark' : 'light';
    this._setDomAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this._currentThemeSubject.next(newTheme);
  }

  private _setDomAttribute(attr: string, value: string): void {
    document.documentElement.setAttribute(attr, value);
  }

  public getCurrentTheme$(): Observable<string> {
    return this._currentThemeSubject.asObservable();
  }
}
