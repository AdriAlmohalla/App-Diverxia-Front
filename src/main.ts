/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import '@angular/common/locales/global/es';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
