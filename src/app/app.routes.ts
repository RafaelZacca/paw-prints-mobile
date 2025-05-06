import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./pages/auth/callback/callback.page').then((m) => m.CallbackPage),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./shared/components/tabs/tab.routes').then((m) => m.routes),
  },
  {
    path: 'pet-details/:id',
    loadComponent: () =>
      import('./pages/pet-detail/pet-details.page').then((m) => m.PetDetailsPage),
  },
  {
    path: 'pet-creation',
    loadComponent: () =>
      import('./pages/pet-creation/pet-creation.page').then((m) => m.PetCreationPage),
  },
  {
    path: 'pet-details/:id/medical-record-creation',
    loadComponent: () =>
      import('./pages/medical-record-creation/medical-record-creation.page').then(
        (m) => m.MedicalRecordCreationPage,
      ),
  },
];
