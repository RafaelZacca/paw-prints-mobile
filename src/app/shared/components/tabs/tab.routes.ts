import { Routes } from '@angular/router';
import { TabsComponent } from '@components/tabs/tabs.component';

export const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../../../pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../../../pages/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'info',
        loadComponent: () =>
          import('../../../pages/information/information.page').then((m) => m.InformationPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
