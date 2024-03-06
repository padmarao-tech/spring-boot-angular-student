import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRequestInterceptor } from './interceptors/request.interceptor';
import { AppResponseInterceptor } from './interceptors/response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    AppRequestInterceptor,
    AppResponseInterceptor
  ]
};
