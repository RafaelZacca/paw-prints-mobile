import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Storage } from '@capacitor/storage';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  const tokenResult = await Storage.get({ key: 'access_token' });
  const token = tokenResult.value;

  if (token) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
