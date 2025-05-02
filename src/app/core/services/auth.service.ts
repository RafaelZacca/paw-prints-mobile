import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.listenForDeepLink();
  }

  listenForDeepLink() {
    App.addListener('appUrlOpen', async (event) => {
      console.log('Deep link opened', event);

      const url = event.url;
      if (url && url.startsWith('pawprints://callback')) {
        const urlObj = new URL(url);
        const token = urlObj.searchParams.get('token');

        if (token) {
          console.log('Token received from deep link:', token);

          await Storage.set({ key: 'access_token', value: token });

          // Navigate to Home Page
          window.location.href = 'tabs/home'; // (or Angular router navigation if you want later)
        }

        // Close the external browser (Capacitor Browser plugin)
        await Browser.close();
      }
    });
  }

  async loginWithGoogle() {
    try {
      let loginUrl = `${environment.apiUrl}/auth/google`;

      if (Capacitor.isNativePlatform()) {
        loginUrl += '?state=mobile';
        await Browser.open({ url: loginUrl });
      } else {
        loginUrl += '?state=web';
        window.location.href = loginUrl;
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  }
}
