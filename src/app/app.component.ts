import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'weather-app';

  constructor() {
    if (import.meta.env.NG_APP_ENV === 'development') {
      const appVersion = import.meta.env.NG_APP_VERSION;
      const apiUrl = import.meta.env.NG_APP_API_URL;
      const apiKey = import.meta.env.NG_APP_API_KEY;

      console.log(`APP version: ${appVersion}`);
      console.log(`API URL: ${apiUrl}`);
      console.log(`API KEY: ${apiKey}`);
    }
  }
}
