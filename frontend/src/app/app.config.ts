import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http'; // Importar provideHttpClient

import { RouterModule } from '@angular/router'; // Importar RouterModule

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Agregar provideHttpClient aquí
    RouterModule // Asegúrate de importar el módulo del enrutador aquí
  ]
};
