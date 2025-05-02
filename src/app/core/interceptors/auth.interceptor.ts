import { HttpInterceptorFn } from '@angular/common/http';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return from(Storage.get({ key: 'access_token' })).pipe(
    switchMap((tokenResult) => {
      const token = tokenResult.value;

      if (token) {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(clonedRequest);
      }

      return next(req);
    }),
  );
};
