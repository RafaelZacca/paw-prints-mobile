import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from '@interceptors/loading.interceptor';
import { addIcons } from 'ionicons';
import {
  personOutline,
  calendarOutline,
  callOutline,
  mailOutline,
  pawOutline,
  informationCircleOutline,
  homeOutline,
  eggOutline,
  fishOutline,
  leafOutline,
  cloudyOutline,
  arrowBackOutline,
  pricetagOutline,
  locationOutline,
  femaleOutline,
  maleOutline,
  createOutline,
  medkitOutline,
  searchOutline,
  bandageOutline,
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authInterceptor } from '@interceptors/auth.interceptor';

addIcons({
  'person-outline': personOutline,
  'calendar-outline': calendarOutline,
  'call-outline': callOutline,
  'mail-outline': mailOutline,
  'paw-outline': pawOutline,
  'information-circle-outline': informationCircleOutline,
  'home-outline': homeOutline,
  'egg-outline': eggOutline,
  'fish-outline': fishOutline,
  'leaf-outline': leafOutline,
  'cloudy-outline': cloudyOutline,
  'arrow-back-outline': arrowBackOutline,
  'pricetag-outline': pricetagOutline,
  'location-outline': locationOutline,
  'female-outline': femaleOutline,
  'male-outline': maleOutline,
  'create-outline': createOutline,
  'medkit-outline': medkitOutline,
  'search-outline': searchOutline,
  'bandage-outline': bandageOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([loadingInterceptor, authInterceptor])),
  ],
});
