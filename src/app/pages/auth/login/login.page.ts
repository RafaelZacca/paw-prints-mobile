import { Component } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent],
})
export class LoginPage {
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private router: Router,
  ) {
    this.checkLoggedIn();
  }

  async login() {
    this.loaderService.show();

    try {
      await this.authService.loginWithGoogle();
      // No need to manually check success here - login result will be caught via deep link listener
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      this.loaderService.hide();
    }
  }

  async checkLoggedIn() {
    const tokenResult = await Storage.get({ key: 'access_token' });
    const token = tokenResult.value;

    if (token) {
      this.router.navigateByUrl('/home');
    }
  }
}
