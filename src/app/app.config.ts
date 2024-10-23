import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { provideHttpClient, withFetch, withXsrfConfiguration } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      theme: {
        'background-color': '#323232',
        border: '1px solid #323232',
        'animation-duration': '2s'
      }
    })),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(
      withFetch(),
      withXsrfConfiguration({
        cookieName: 'TOKEN', // default is 'XSRF-TOKEN'
        headerName: 'X-TOKEN' // default is 'X-XSRF-TOKEN'
      })
    )
  ]
};
